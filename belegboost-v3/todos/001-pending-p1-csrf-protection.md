---
status: pending
priority: p1
issue_id: "001"
tags: [security, csrf, api]
dependencies: []
---

# CRIT-1: Apply CSRF Protection to All Mutation Endpoints

## Problem Statement
CSRF protection middleware exists (`lib/csrf.ts`) with the `withCsrfProtection` wrapper, but it is only applied to the registration endpoint. All other POST/PATCH/DELETE endpoints lack CSRF validation, making them vulnerable to Cross-Site Request Forgery attacks.

## Findings
- Discovered during security audit
- Location: All API routes in `app/api/`
- Only `app/api/auth/register/route.ts` has CSRF protection applied

## Affected Files
- `app/api/portal/submit/route.ts` (Line 9)
- `app/api/team/route.ts` (Lines 22, 79)
- `app/api/team/[id]/route.ts` (Line 9)
- `app/api/submissions/[id]/route.ts` (Line 10)
- `app/api/auth/forgot-password/route.ts` (Line 8)

## Proposed Solution
Apply `withCsrfProtection` wrapper to ALL mutation endpoints:

```typescript
// Example: app/api/portal/submit/route.ts
import { withCsrfProtection } from '@/lib/csrf';

export const POST = withCsrfProtection(async (request: NextRequest) => {
  // existing logic
});
```

## Impact
- **Security Risk**: HIGH - Attackers can trick authenticated users into performing unwanted actions
- **Effort**: Small (1-2 hours)
- **Risk**: Low

## Acceptance Criteria
- [ ] All POST endpoints wrapped with `withCsrfProtection`
- [ ] All PATCH endpoints wrapped with `withCsrfProtection`
- [ ] All DELETE endpoints wrapped with `withCsrfProtection`
- [ ] Tests verify CSRF validation on all mutation endpoints
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified missing CSRF protection across API routes
