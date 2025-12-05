---
status: pending
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
- [ ] Demo mode is read-only (GET requests only)
- [ ] Mutation attempts return 403 Forbidden
- [ ] Demo data cannot be modified
- [ ] Tests verify demo mode restrictions

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified unrestricted demo mode access
