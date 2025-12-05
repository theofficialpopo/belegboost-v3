---
status: completed
priority: p2
issue_id: "006"
tags: [security, authentication, demo]
dependencies: []
---

# HIGH-2: Secure Demo Mode Access

## Problem Statement
The demo organization (`slug === 'demo'`) allows completely unauthenticated access to dashboard routes, including mutation endpoints.

## Findings
- Discovered during security audit
- Location: `middleware.ts` (Lines 28-30)

```typescript
// Skip auth checks for demo mode - anyone can access
if (urlSlug === 'demo') {
  return NextResponse.next();
}
```

## Security Risk
- Publicly exposed demo data without any access control
- Potential for abuse (data modification, deletion)
- Could be used to test exploits against real API endpoints

## Proposed Solution
Implement read-only mode for demo organization:

```typescript
// In middleware.ts
if (urlSlug === 'demo') {
  // Allow GET requests (read-only)
  if (request.method === 'GET') {
    return NextResponse.next();
  }
  // Block mutations
  return NextResponse.json({ error: 'Demo mode is read-only' }, { status: 403 });
}
```

Alternative: Create time-limited demo sessions with tracking.

## Impact
- **Security Risk**: HIGH - Unauthorized data modification possible
- **Effort**: Small (1 hour)
- **Risk**: Low

## Acceptance Criteria
- [x] Demo mode is read-only (GET requests only)
- [x] Mutation attempts return 403 Forbidden
- [x] Demo data cannot be modified
- [x] Environment check disables demo mode in production
- [x] All API mutation endpoints protected

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified unrestricted demo mode access

### 2025-12-05 - Security Fix Implementation
**By:** Claude Code
**Actions:**
- Implemented read-only mode in middleware.ts (GET requests only)
- Added demo mode protection to all mutation API endpoints
- Created isDemoMode() and demoModeReadOnly() helper functions
- Added ENABLE_DEMO_MODE environment variable
- Demo mode automatically disabled in production unless explicitly enabled
- Updated all affected API routes: team POST/PATCH/DELETE, submissions PATCH, portal submit
