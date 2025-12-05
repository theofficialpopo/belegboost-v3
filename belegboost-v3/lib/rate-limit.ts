/**
 * Rate limiting utility for authentication endpoints
 *
 * Features:
 * - In-memory storage (suitable for single-instance deployment)
 * - Tracks login attempts by IP address
 * - Implements exponential backoff for repeated failures
 * - Automatic cleanup of expired entries
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
  firstAttemptAt: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry>;
  private cleanupInterval: NodeJS.Timeout | null;

  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {
    this.attempts = new Map();
    this.cleanupInterval = null;
    this.startCleanup();
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Usually an IP address
   * @returns Rate limit result with success status and metadata
   */
  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    // No previous attempts or window has expired
    if (!entry || now > entry.resetAt) {
      this.attempts.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs,
        firstAttemptAt: now,
      });

      return {
        success: true,
        limit: this.maxAttempts,
        remaining: this.maxAttempts - 1,
        reset: now + this.windowMs,
      };
    }

    // Within the rate limit window
    if (entry.count < this.maxAttempts) {
      entry.count++;
      this.attempts.set(identifier, entry);

      return {
        success: true,
        limit: this.maxAttempts,
        remaining: this.maxAttempts - entry.count,
        reset: entry.resetAt,
      };
    }

    // Rate limit exceeded - calculate exponential backoff
    const retryAfter = this.calculateBackoff(entry);

    return {
      success: false,
      limit: this.maxAttempts,
      remaining: 0,
      reset: entry.resetAt,
      retryAfter,
    };
  }

  /**
   * Record a successful login (resets the rate limit for this identifier)
   * @param identifier - Usually an IP address
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }

  /**
   * Calculate exponential backoff based on time since first attempt
   * @param entry - Rate limit entry
   * @returns Milliseconds until retry is allowed
   */
  private calculateBackoff(entry: RateLimitEntry): number {
    const now = Date.now();
    const timeSinceFirst = now - entry.firstAttemptAt;

    // Base backoff: 1 minute
    // Exponential multiplier based on 5-minute intervals
    const intervals = Math.floor(timeSinceFirst / (5 * 60 * 1000));
    const backoffMs = Math.min(
      60 * 1000 * Math.pow(2, intervals), // Exponential backoff
      60 * 60 * 1000 // Max 1 hour
    );

    return Math.max(entry.resetAt - now, backoffMs);
  }

  /**
   * Start automatic cleanup of expired entries (runs every 5 minutes)
   */
  private startCleanup(): void {
    // Run cleanup every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const expiredKeys: string[] = [];

      for (const [key, entry] of this.attempts.entries()) {
        if (now > entry.resetAt) {
          expiredKeys.push(key);
        }
      }

      for (const key of expiredKeys) {
        this.attempts.delete(key);
      }
    }, 5 * 60 * 1000);

    // Ensure cleanup doesn't prevent Node.js from exiting
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Stop the cleanup interval (useful for testing or shutdown)
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Get current statistics (useful for monitoring)
   */
  getStats(): {
    totalTracked: number;
    rateLimited: number;
  } {
    const now = Date.now();
    let rateLimited = 0;

    for (const entry of this.attempts.values()) {
      if (entry.count >= this.maxAttempts && now <= entry.resetAt) {
        rateLimited++;
      }
    }

    return {
      totalTracked: this.attempts.size,
      rateLimited,
    };
  }
}

// Singleton instance for authentication rate limiting (5 attempts per 15 minutes)
const authRateLimiter = new RateLimiter(5, 15 * 60 * 1000);

// Singleton instance for registration rate limiting (5 attempts per hour)
const registrationRateLimiter = new RateLimiter(5, 60 * 60 * 1000);

/**
 * Extract IP address from request headers
 * Handles various proxy headers (Vercel, Cloudflare, etc.)
 * @param headers - Request headers
 * @returns IP address or fallback identifier
 */
export function getClientIp(headers: Headers): string {
  // Check common proxy headers in order of preference
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Vercel-specific header
  const vercelIp = headers.get('x-vercel-forwarded-for');
  if (vercelIp) {
    return vercelIp.split(',')[0].trim();
  }

  // Cloudflare header
  const cfIp = headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp;
  }

  // Fallback to a constant if no IP is available
  // In production, this should rarely happen
  return 'unknown';
}

/**
 * Check rate limit for authentication attempts
 * @param identifier - Usually an IP address
 * @returns Rate limit result
 */
export function checkAuthRateLimit(identifier: string): RateLimitResult {
  return authRateLimiter.check(identifier);
}

/**
 * Reset rate limit after successful authentication
 * @param identifier - Usually an IP address
 */
export function resetAuthRateLimit(identifier: string): void {
  authRateLimiter.reset(identifier);
}

/**
 * Get authentication rate limiter statistics
 */
export function getAuthRateLimitStats() {
  return authRateLimiter.getStats();
}

/**
 * Check rate limit for registration attempts
 * @param identifier - Usually an IP address
 * @returns Rate limit result
 */
export function checkRegistrationRateLimit(identifier: string): RateLimitResult {
  return registrationRateLimiter.check(identifier);
}

/**
 * Reset rate limit after successful registration
 * @param identifier - Usually an IP address
 */
export function resetRegistrationRateLimit(identifier: string): void {
  registrationRateLimiter.reset(identifier);
}

/**
 * Get registration rate limiter statistics
 */
export function getRegistrationRateLimitStats() {
  return registrationRateLimiter.getStats();
}

/**
 * Create a custom error class for rate limit errors
 */
export class RateLimitError extends Error {
  constructor(
    message: string,
    public retryAfter: number,
    public limit: number
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}
