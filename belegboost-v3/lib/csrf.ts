/**
 * CSRF Protection Middleware
 *
 * Validates Origin/Referer headers to prevent Cross-Site Request Forgery attacks
 * on mutation endpoints (POST, PUT, PATCH, DELETE).
 *
 * Note: NextAuth v5 provides built-in CSRF protection for auth endpoints,
 * but we need to protect other mutation endpoints manually.
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Get allowed origins from environment variable
 * Defaults to localhost for development
 */
function getAllowedOrigins(): string[] {
  const envOrigins = process.env.ALLOWED_ORIGINS;

  if (envOrigins) {
    return envOrigins.split(',').map(origin => origin.trim());
  }

  // Default allowed origins for development
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    return [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ];
  }

  // In production, ALLOWED_ORIGINS must be explicitly set
  // If not set, only allow the NEXTAUTH_URL
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  if (nextAuthUrl) {
    try {
      const url = new URL(nextAuthUrl);
      return [url.origin];
    } catch {
      console.error('Invalid NEXTAUTH_URL:', nextAuthUrl);
    }
  }

  return [];
}

/**
 * Extract origin from Origin or Referer header
 */
function getRequestOrigin(request: NextRequest): string | null {
  // Prefer Origin header (more reliable)
  const origin = request.headers.get('origin');
  if (origin) {
    return origin;
  }

  // Fallback to Referer header
  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const url = new URL(referer);
      return url.origin;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Validate CSRF token by checking Origin/Referer headers
 *
 * @param request - Next.js request object
 * @returns NextResponse with error if validation fails, null if valid
 */
export function validateCsrf(request: NextRequest): NextResponse | null {
  const requestOrigin = getRequestOrigin(request);
  const allowedOrigins = getAllowedOrigins();

  // If no origin header is present, reject the request
  if (!requestOrigin) {
    console.warn('CSRF validation failed: No Origin or Referer header present');
    return NextResponse.json(
      { error: 'Invalid request origin' },
      { status: 403 }
    );
  }

  // If no allowed origins are configured, reject
  if (allowedOrigins.length === 0) {
    console.error('CSRF validation failed: No allowed origins configured');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  // Check if request origin matches any allowed origin
  const isAllowed = allowedOrigins.some(allowedOrigin => {
    return requestOrigin === allowedOrigin;
  });

  if (!isAllowed) {
    console.warn(
      'CSRF validation failed: Origin not allowed',
      { requestOrigin, allowedOrigins }
    );
    return NextResponse.json(
      { error: 'Invalid request origin' },
      { status: 403 }
    );
  }

  // Validation passed
  return null;
}

/**
 * Middleware wrapper for API routes that need CSRF protection
 *
 * Usage:
 * ```typescript
 * import { withCsrfProtection } from '@/lib/csrf';
 *
 * export const POST = withCsrfProtection(async (request: NextRequest) => {
 *   // Your handler logic here
 * });
 * ```
 */
export function withCsrfProtection(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    // Validate CSRF
    const csrfError = validateCsrf(request);
    if (csrfError) {
      return csrfError;
    }

    // If validation passed, call the original handler
    return handler(request, context);
  };
}
