# Rate Limiting Quick Reference

## Overview

This utility provides rate limiting for authentication endpoints to prevent brute force attacks.

## Key Features

- 5 login attempts per 15 minutes per IP address
- Exponential backoff for repeated violations
- Automatic cleanup of expired entries
- Successful login resets the counter
- Works with various proxy configurations

## Basic Usage

### In Authentication Flow (Already Integrated)

The rate limiting is automatically applied in `auth.ts`. No additional code needed.

### Manual Usage (Advanced)

```typescript
import {
  checkAuthRateLimit,
  resetAuthRateLimit,
  getClientIp,
  RateLimitError,
} from '@/lib/rate-limit';

// Extract IP from request
const clientIp = getClientIp(request.headers);

// Check if request is allowed
const result = checkAuthRateLimit(clientIp);

if (!result.success) {
  throw new RateLimitError(
    `Too many attempts. Try again in ${result.retryAfter}ms`,
    result.retryAfter || 0,
    result.limit
  );
}

// ... perform authentication ...

// On success, reset the limit
resetAuthRateLimit(clientIp);
```

## Monitoring

```typescript
import { getAuthRateLimitStats } from '@/lib/rate-limit';

const stats = getAuthRateLimitStats();
console.log(stats);
// { totalTracked: 42, rateLimited: 3 }
```

## Configuration

To change limits, modify the singleton initialization in `lib/rate-limit.ts`:

```typescript
const authRateLimiter = new RateLimiter(
  10,                   // maxAttempts: increase to 10
  20 * 60 * 1000        // windowMs: increase to 20 minutes
);
```

## Testing

Run the test suite:

```bash
npx tsx lib/rate-limit.test.ts
```

## Rate Limit Response

```typescript
interface RateLimitResult {
  success: boolean;      // true if allowed, false if blocked
  limit: number;         // maximum attempts allowed
  remaining: number;     // attempts remaining
  reset: number;         // timestamp when limit resets
  retryAfter?: number;   // milliseconds until retry (when blocked)
}
```

## Supported Headers

The system checks these headers for IP address (in order):

1. `x-forwarded-for` (standard)
2. `x-real-ip` (alternative)
3. `x-vercel-forwarded-for` (Vercel)
4. `cf-connecting-ip` (Cloudflare)

Falls back to `"unknown"` if no headers present.

## Edge Cases

### Multiple Users Behind Same IP

Corporate networks or shared WiFi may cause legitimate users to share IPs. Consider:
- Increasing the limit to 10-20 attempts
- Adding per-account rate limiting
- Using CAPTCHA as a fallback

### Deployment Considerations

This implementation uses **in-memory storage** and is suitable for:
- Single-instance deployments
- Development environments
- Small to medium traffic sites

For high-traffic or multi-instance deployments, migrate to:
- Redis-based rate limiting
- Distributed cache solutions
- Dedicated rate limiting services (Upstash, Cloudflare)

## Security Notes

- **Always use HTTPS** in production
- **Deploy behind a reverse proxy** for DDoS protection
- **Monitor rate limit statistics** for unusual patterns
- **Consider additional factors** beyond IP (user agent, device fingerprint)
- **Implement account lockout** for persistent attacks on specific accounts

## Full Documentation

See `docs/RATE_LIMITING.md` for complete documentation including:
- Architecture details
- Exponential backoff algorithm
- Migration strategies
- Troubleshooting guide
- Future enhancements
