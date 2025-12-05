# Rate Limiting Implementation

This document describes the rate limiting system implemented to protect authentication endpoints from brute force attacks.

## Overview

The rate limiting system tracks login attempts by IP address and implements exponential backoff for repeated failed attempts. It uses in-memory storage suitable for single-instance deployments.

## Features

- **IP-based tracking**: Limits authentication attempts per IP address
- **Configurable limits**: 5 attempts per 15-minute window (default)
- **Exponential backoff**: Progressively longer delays for repeated violations
- **Automatic cleanup**: Expired entries are removed every 5 minutes
- **Successful login reset**: Rate limits are cleared on successful authentication
- **Multiple header support**: Works with various proxy configurations (Vercel, Cloudflare, etc.)
- **Graceful fallback**: Handles missing IP headers appropriately

## Architecture

### Components

1. **`lib/rate-limit.ts`** - Core rate limiting utility
   - `RateLimiter` class - Manages rate limit tracking and enforcement
   - `getClientIp()` - Extracts IP from request headers
   - `checkAuthRateLimit()` - Validates if request should be allowed
   - `resetAuthRateLimit()` - Clears limits after successful login
   - `RateLimitError` - Custom error for rate limit violations

2. **`auth.ts`** - Authentication integration
   - Uses lazy initialization to access request headers
   - Checks rate limits before credential validation
   - Resets limits on successful authentication
   - Throws `RateLimitError` when limit exceeded

## Configuration

### Default Settings

```typescript
const authRateLimiter = new RateLimiter(
  5,                    // maxAttempts: 5 attempts allowed
  15 * 60 * 1000        // windowMs: 15 minute window
);
```

### Exponential Backoff

When the rate limit is exceeded, the retry delay increases exponentially:

- **Base delay**: 1 minute
- **Scaling**: Doubles every 5 minutes of continued violations
- **Maximum**: 1 hour

Example progression:
- 0-5 minutes of violations: 1 minute retry delay
- 5-10 minutes: 2 minute retry delay
- 10-15 minutes: 4 minute retry delay
- 15-20 minutes: 8 minute retry delay
- 20+ minutes: Up to 60 minute retry delay (capped)

## IP Address Extraction

The system checks headers in the following priority order:

1. `x-forwarded-for` - Standard proxy header (uses first IP in chain)
2. `x-real-ip` - Alternative proxy header
3. `x-vercel-forwarded-for` - Vercel-specific header
4. `cf-connecting-ip` - Cloudflare header
5. Fallback to `"unknown"` if no headers present

### Security Note

Using IP-based rate limiting has limitations:
- Multiple users behind the same NAT/proxy share an IP
- Attackers can use distributed attacks from multiple IPs
- IPv6 can provide many addresses to the same attacker

For production systems, consider additional measures:
- Account-based rate limiting (per email address)
- CAPTCHA after multiple failures
- Device fingerprinting
- Anomaly detection

## Usage

### Basic Authentication Flow

```typescript
// 1. Extract IP from request
const clientIp = getClientIp(req.headers);

// 2. Check rate limit
const rateLimitResult = checkAuthRateLimit(clientIp);

if (!rateLimitResult.success) {
  throw new RateLimitError(
    `Too many attempts. Retry in ${rateLimitResult.retryAfter}ms`,
    rateLimitResult.retryAfter || 0,
    rateLimitResult.limit
  );
}

// 3. Attempt authentication
const authenticated = await validateCredentials(email, password);

if (authenticated) {
  // 4. Reset rate limit on success
  resetAuthRateLimit(clientIp);
  return user;
}

// Failed attempts are tracked automatically
return null;
```

### Monitoring

Get statistics about current rate limiting:

```typescript
import { getAuthRateLimitStats } from '@/lib/rate-limit';

const stats = getAuthRateLimitStats();
console.log(`Total tracked IPs: ${stats.totalTracked}`);
console.log(`Rate limited IPs: ${stats.rateLimited}`);
```

## Error Handling

When rate limited, the `authorize` function throws a `RateLimitError`:

```typescript
try {
  const user = await signIn('credentials', { email, password });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after: ${error.retryAfter}ms`);
    console.log(`Limit: ${error.limit} attempts`);
    // Display user-friendly error message
  }
}
```

## Testing

Run the test suite to verify rate limiting functionality:

```bash
npx tsx lib/rate-limit.test.ts
```

Tests cover:
- Basic rate limiting (5 attempts, then block)
- Rate limit reset after successful login
- IP isolation (different IPs tracked separately)
- Header parsing (all proxy configurations)
- Statistics tracking
- Error class functionality

## Performance Considerations

### Memory Usage

- Each tracked IP uses ~100 bytes of memory
- With 10,000 active IPs: ~1 MB memory usage
- Automatic cleanup runs every 5 minutes
- Entries expire after 15 minutes of inactivity

### Scalability

This implementation is designed for **single-instance deployments**. For multi-instance or serverless environments, consider:

1. **Redis-based rate limiting**
   ```typescript
   // Example with Redis
   import { Redis } from '@upstash/redis';
   const redis = new Redis({ url: '...', token: '...' });

   async function checkRateLimit(ip: string) {
     const key = `ratelimit:${ip}`;
     const count = await redis.incr(key);
     if (count === 1) {
       await redis.expire(key, 900); // 15 minutes
     }
     return count <= 5;
   }
   ```

2. **Distributed rate limiting services**
   - Upstash Rate Limit
   - Cloudflare Rate Limiting
   - AWS WAF

3. **Database-based tracking**
   - Store attempts in PostgreSQL/MySQL
   - Use TTL columns for auto-cleanup
   - Index on IP and timestamp

## Security Best Practices

1. **Deploy behind a reverse proxy** (Nginx, Cloudflare) for DDoS protection
2. **Use HTTPS** to prevent credential interception
3. **Monitor rate limit stats** for unusual patterns
4. **Implement account lockout** after X failed attempts per account
5. **Add CAPTCHA** for suspected bot traffic
6. **Log rate limit events** for security auditing
7. **Consider geographic restrictions** for sensitive accounts

## Migration Path

To migrate to a distributed rate limiting solution:

1. Create a new implementation of the rate limiting interface
2. Implement the same function signatures (`checkAuthRateLimit`, etc.)
3. Swap the import in `auth.ts`
4. Test thoroughly before deployment

Example interface:

```typescript
interface RateLimitProvider {
  check(identifier: string): Promise<RateLimitResult>;
  reset(identifier: string): Promise<void>;
  getStats(): Promise<RateLimitStats>;
}
```

## Troubleshooting

### Users Behind Corporate Proxy

**Problem**: Multiple employees share the same IP address

**Solutions**:
- Increase `maxAttempts` to 10-20
- Add per-account rate limiting alongside IP limits
- Use device fingerprinting

### Rate Limit Not Triggering

**Checks**:
1. Verify IP extraction: `console.log(getClientIp(req.headers))`
2. Check if using lazy initialization in `auth.ts`
3. Ensure NextAuth v5 is configured correctly
4. Review proxy headers in your deployment environment

### Memory Leaks

**Symptoms**: Memory usage grows over time

**Solutions**:
- Verify cleanup interval is running
- Check for stuck entries: `getAuthRateLimitStats()`
- Consider shorter `windowMs` (e.g., 10 minutes)

## Future Enhancements

Potential improvements for future versions:

1. **Account-based limits**: Track by email in addition to IP
2. **Geolocation blocking**: Block suspicious geographic regions
3. **Reputation scoring**: Adjust limits based on past behavior
4. **Webhook notifications**: Alert on rate limit events
5. **Admin dashboard**: Visualize rate limiting statistics
6. **Whitelist/blacklist**: Manual IP management
7. **Progressive challenges**: Increase difficulty with failures (CAPTCHA, 2FA)

## References

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [NextAuth.js Documentation](https://authjs.dev)
- [Rate Limiting Strategies](https://www.nginx.com/blog/rate-limiting-nginx/)
