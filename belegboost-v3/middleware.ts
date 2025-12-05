import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

// Reserved paths that should NOT be treated as org slugs (demo is now handled as a special org slug)
const RESERVED_PATHS = [
  'login', 'signup', 'forgot-password',
  'api', '_next', 'favicon.ico', 'features', 'pricing', 'docs', 'preise',
  'blog', 'kontakt', 'karriere', 'integrationen', 'integration', 'agb', 'datenschutz', 'impressum',
  'ueber-uns', 'dokumentation', 'api-referenz', 'sicherheit'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // Check if this is an org route: /[slug]/dashboard or /[slug]/portal
  // First segment must not be a reserved path (or can be 'demo' for demo mode)
  const isOrgRoute = firstSegment &&
    (!RESERVED_PATHS.includes(firstSegment) || firstSegment === 'demo') &&
    segments.length >= 2 &&
    (segments[1] === 'dashboard' || segments[1] === 'portal');

  if (isOrgRoute && segments[1] === 'dashboard') {
    const urlSlug = firstSegment;

    // Demo mode: read-only access (GET requests only)
    if (urlSlug === 'demo') {
      // Disable demo mode in production
      if (process.env.NODE_ENV === 'production' && process.env.ENABLE_DEMO_MODE !== 'true') {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Allow GET requests (read-only)
      if (request.method === 'GET') {
        return NextResponse.next();
      }

      // Block all mutation requests (POST, PUT, PATCH, DELETE)
      return NextResponse.json(
        {
          error: 'Demo mode is read-only',
          message: 'Mutations are not allowed in demo mode'
        },
        { status: 403 }
      );
    }

    // Get session for protected routes
    const session = await auth();

    // Not authenticated - redirect to login
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userSlug = session.user?.organizationSlug;

    // User doesn't belong to this organization
    if (userSlug && urlSlug !== userSlug) {
      // Redirect to their own org's dashboard
      return NextResponse.redirect(new URL(`/${userSlug}/dashboard`, request.url));
    }
  }

  // Get session for auth page redirects
  const session = await auth();

  // Auth pages - redirect authenticated users to their dashboard
  if (session && (pathname === '/login' || pathname === '/signup')) {
    const userSlug = session.user?.organizationSlug;
    if (userSlug) {
      return NextResponse.redirect(new URL(`/${userSlug}/dashboard`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
