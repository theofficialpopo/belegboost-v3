/**
 * Manual test for Redis rate limiting
 *
 * To test Redis mode:
 * 1. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local
 * 2. Run: npx tsx lib/rate-limit-redis-test.ts
 *
 * To test in-memory mode:
 * 1. Ensure Redis env vars are NOT set
 * 2. Run: npx tsx lib/rate-limit-redis-test.ts
 */

import {
  checkAuthRateLimit,
  resetAuthRateLimit,
  getAuthRateLimitStats,
} from './rate-limit';

async function testRateLimiting() {
  console.log('\n=== Rate Limiting Test ===\n');

  const testIp = '192.168.1.100';

  // Test 1: Check initial state
  console.log('Test 1: Initial request should succeed');
  const result1 = await checkAuthRateLimit(testIp);
  console.log('✓ Success:', result1.success);
  console.log('  Remaining:', result1.remaining);
  console.log('  Limit:', result1.limit);

  // Test 2: Make multiple requests
  console.log('\nTest 2: Testing rate limit threshold (5 attempts)');
  for (let i = 2; i <= 6; i++) {
    const result = await checkAuthRateLimit(testIp);
    console.log(`Attempt ${i}:`, {
      success: result.success,
      remaining: result.remaining,
      retryAfter: result.retryAfter ? `${Math.ceil(result.retryAfter / 1000)}s` : 'N/A',
    });
  }

  // Test 3: Test reset
  console.log('\nTest 3: Reset rate limit');
  await resetAuthRateLimit(testIp);
  const result3 = await checkAuthRateLimit(testIp);
  console.log('✓ After reset:', {
    success: result3.success,
    remaining: result3.remaining,
  });

  // Test 4: Get statistics
  console.log('\nTest 4: Get statistics');
  const stats = await getAuthRateLimitStats();
  console.log('✓ Stats:', stats);

  console.log('\n=== Test Complete ===\n');
}

testRateLimiting().catch(console.error);
