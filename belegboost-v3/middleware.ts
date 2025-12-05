import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// Reserved paths that should NOT be treated as org slugs (demo is now handled as a special org slug)
const RESERVED_PATHS = [
  'login', 'signup', 'forgot-password',
  'api', '_next', 'favicon.ico', 'features', 'pricing', 'docs', 'preise',
  'blog', 'kontakt', 'karriere', 'integrationen', 'integration', 'agb', 'datenschutz', 'impressum',
  'ueber-uns', 'dokumentation', 'api-referenz', 'sicherheit'
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
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

    // Skip auth checks for demo mode - anyone can access
    if (urlSlug === 'demo') {
      return NextResponse.next();
    }

    // Not authenticated - redirect to login
    if (!req.auth) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userSlug = req.auth.user?.organizationSlug;

    // User doesn't belong to this organization
    if (userSlug && urlSlug !== userSlug) {
      // Redirect to their own org's dashboard
      return NextResponse.redirect(new URL(`/${userSlug}/dashboard`, req.url));
    }
  }

  // Auth pages - redirect authenticated users to their dashboard
  if (req.auth && (pathname === '/login' || pathname === '/signup')) {
    const userSlug = req.auth.user?.organizationSlug;
    if (userSlug) {
      return NextResponse.redirect(new URL(`/${userSlug}/dashboard`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
