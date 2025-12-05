/**
 * Basic tests for rate limiting functionality
 * Run with: npx tsx lib/rate-limit.test.ts
 */

import {
  checkAuthRateLimit,
  resetAuthRateLimit,
  getAuthRateLimitStats,
  getClientIp,
  RateLimitError,
} from './rate-limit';

// Helper to simulate delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function testBasicRateLimit() {
  console.log('\n=== Test 1: Basic Rate Limit (5 attempts allowed) ===');

  const testIp = '192.168.1.100';

  // First 5 attempts should succeed
  for (let i = 1; i <= 5; i++) {
    const result = checkAuthRateLimit(testIp);
    console.log(
      `Attempt ${i}: ${result.success ? 'ALLOWED' : 'BLOCKED'} - Remaining: ${result.remaining}`
    );

    if (!result.success) {
      console.error(`❌ FAILED: Expected attempt ${i} to succeed`);
      return false;
    }
  }

  // 6th attempt should be blocked
  const result6 = checkAuthRateLimit(testIp);
  console.log(
    `Attempt 6: ${result6.success ? 'ALLOWED' : 'BLOCKED'} - Retry after: ${Math.ceil((result6.retryAfter || 0) / 1000)}s`
  );

  if (result6.success) {
    console.error('❌ FAILED: Expected 6th attempt to be blocked');
    return false;
  }

  console.log('✓ Basic rate limit test passed');
  return true;
}

async function testRateLimitReset() {
  console.log('\n=== Test 2: Rate Limit Reset After Successful Login ===');

  const testIp = '192.168.1.101';

  // Make 3 failed attempts
  for (let i = 1; i <= 3; i++) {
    checkAuthRateLimit(testIp);
  }

  console.log('Made 3 failed attempts');

  // Successful login - reset rate limit
  resetAuthRateLimit(testIp);
  console.log('Reset rate limit after successful login');

  // Should be able to make 5 more attempts
  const result = checkAuthRateLimit(testIp);
  console.log(`New attempt after reset: ${result.success ? 'ALLOWED' : 'BLOCKED'} - Remaining: ${result.remaining}`);

  if (!result.success || result.remaining !== 4) {
    console.error('❌ FAILED: Rate limit should be reset after successful login');
    return false;
  }

  console.log('✓ Rate limit reset test passed');
  return true;
}

async function testIpIsolation() {
  console.log('\n=== Test 3: IP Isolation ===');

  const ip1 = '192.168.1.102';
  const ip2 = '192.168.1.103';

  // Exhaust rate limit for IP1
  for (let i = 0; i < 5; i++) {
    checkAuthRateLimit(ip1);
  }

  const result1 = checkAuthRateLimit(ip1);
  console.log(`IP1 (exhausted): ${result1.success ? 'ALLOWED' : 'BLOCKED'}`);

  // IP2 should still be allowed
  const result2 = checkAuthRateLimit(ip2);
  console.log(`IP2 (fresh): ${result2.success ? 'ALLOWED' : 'BLOCKED'} - Remaining: ${result2.remaining}`);

  if (!result2.success || result1.success) {
    console.error('❌ FAILED: IPs should be isolated from each other');
    return false;
  }

  console.log('✓ IP isolation test passed');
  return true;
}

async function testHeaderParsing() {
  console.log('\n=== Test 4: IP Header Parsing ===');

  const headers = new Headers();

  // Test x-forwarded-for
  headers.set('x-forwarded-for', '203.0.113.1, 198.51.100.1, 192.0.2.1');
  const ip1 = getClientIp(headers);
  console.log(`x-forwarded-for: ${ip1}`);

  if (ip1 !== '203.0.113.1') {
    console.error('❌ FAILED: Should extract first IP from x-forwarded-for');
    return false;
  }

  // Test x-real-ip
  const headers2 = new Headers();
  headers2.set('x-real-ip', '203.0.113.2');
  const ip2 = getClientIp(headers2);
  console.log(`x-real-ip: ${ip2}`);

  if (ip2 !== '203.0.113.2') {
    console.error('❌ FAILED: Should extract IP from x-real-ip');
    return false;
  }

  // Test cf-connecting-ip (Cloudflare)
  const headers3 = new Headers();
  headers3.set('cf-connecting-ip', '203.0.113.3');
  const ip3 = getClientIp(headers3);
  console.log(`cf-connecting-ip: ${ip3}`);

  if (ip3 !== '203.0.113.3') {
    console.error('❌ FAILED: Should extract IP from cf-connecting-ip');
    return false;
  }

  // Test fallback
  const headers4 = new Headers();
  const ip4 = getClientIp(headers4);
  console.log(`No headers: ${ip4}`);

  if (ip4 !== 'unknown') {
    console.error('❌ FAILED: Should return "unknown" when no IP headers present');
    return false;
  }

  console.log('✓ Header parsing test passed');
  return true;
}

async function testStatistics() {
  console.log('\n=== Test 5: Statistics ===');

  const testIp1 = '192.168.1.104';
  const testIp2 = '192.168.1.105';

  // Exhaust one IP
  for (let i = 0; i < 5; i++) {
    checkAuthRateLimit(testIp1);
  }
  checkAuthRateLimit(testIp1); // One more to trigger rate limit

  // Partially use another IP
  checkAuthRateLimit(testIp2);
  checkAuthRateLimit(testIp2);

  const stats = getAuthRateLimitStats();
  console.log(`Total tracked IPs: ${stats.totalTracked}`);
  console.log(`Rate limited IPs: ${stats.rateLimited}`);

  if (stats.rateLimited < 1) {
    console.error('❌ FAILED: Should show at least one rate limited IP');
    return false;
  }

  console.log('✓ Statistics test passed');
  return true;
}

async function testRateLimitError() {
  console.log('\n=== Test 6: RateLimitError Class ===');

  try {
    throw new RateLimitError('Test error', 60000, 5);
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.log(`Error message: ${error.message}`);
      console.log(`Retry after: ${error.retryAfter}ms`);
      console.log(`Limit: ${error.limit}`);

      if (
        error.message === 'Test error' &&
        error.retryAfter === 60000 &&
        error.limit === 5
      ) {
        console.log('✓ RateLimitError test passed');
        return true;
      }
    }
    console.error('❌ FAILED: RateLimitError properties incorrect');
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting Rate Limit Tests...');

  const tests = [
    testBasicRateLimit,
    testRateLimitReset,
    testIpIsolation,
    testHeaderParsing,
    testStatistics,
    testRateLimitError,
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`❌ Test threw error: ${error}`);
      failed++;
    }
  }

  console.log('\n=== Test Results ===');
  console.log(`Passed: ${passed}/${tests.length}`);
  console.log(`Failed: ${failed}/${tests.length}`);

  if (failed === 0) {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed');
    process.exit(1);
  }
}

runAllTests().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});
