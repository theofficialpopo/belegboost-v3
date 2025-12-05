---
status: completed
priority: p3
issue_id: "017"
tags: [code-quality, cleanup, yagni]
dependencies: []
---

# MED-8: Remove Dead Code and Unused Exports

## Problem Statement
425+ lines of dead code exist in the codebase, including unused functions, mock data in production, and speculative abstractions built for features that don't exist.

## Findings
- Discovered during simplicity review
- Multiple locations with YAGNI violations

## Dead Code Locations

### lib/db-helpers.ts (~120 LOC) - PARTIALLY COMPLETED
- Lines 27-35: `withOrgScope` - REMOVED (never called)
- Lines 263-279: `countActiveTeamMembersForOrg` - REMOVED (never called)
- Lines 374-400: `countExportsByStatusForOrg` - REMOVED (never called)

### lib/rate-limit.ts (~100 LOC) - CANNOT REMOVE
- Lines 101-114: Exponential backoff - ACTIVELY USED internally (line 77)
- Lines 119-140: Cleanup interval - NECESSARY for memory management
- Lines 155-173: Statistics tracking - USED in tests (rate-limit.test.ts)
- Lines 268-277: Custom error class - ACTIVELY USED in auth.ts and register route

### lib/data.ts (~146 LOC) - CANNOT REMOVE YET
- Lines 27-130: Mock submissions data - ACTIVELY USED in dashboard/overview/page.tsx
- Lines 132-173: Mock team members - ACTIVELY USED in dashboard/team/page.tsx
- Note: Can only remove after implementing real data fetching from database

### lib/storage.ts (9 LOC) - CANNOT REMOVE
- Lines 168-176: `uploadFile` wrapper - ACTIVELY USED in app/api/portal/submit/route.ts

## Actual Solution Implemented
1. ✅ Deleted unused functions from db-helpers.ts (3 functions, ~45 LOC)
2. ❌ Cannot simplify rate-limit.ts - all code is actively used
3. ❌ Cannot move mock data yet - still used by dashboard pages
4. ❌ Cannot remove storage wrapper - used in production code

## Impact
- **Bundle Size**: Reduced by ~45 LOC from db-helpers.ts
- **Maintainability**: 3 fewer unused functions to maintain
- **Clarity**: Removed confusing unused code
- **Effort**: 30 minutes (actual)
- **Risk**: None - only truly dead code was removed

## Acceptance Criteria
- [x] Unused db-helpers functions removed
- [x] No functionality broken
- [x] Build passes
- [x] Verified all removals with grep searches
- [N/A] Mock data still needed for current implementation
- [N/A] Rate limiter code is all actively used
- [N/A] Storage wrapper is used in production

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified 425+ LOC of dead/unused code

### 2025-12-05 - Verification and Partial Cleanup
**By:** Claude Code
**Actions:**
- Verified actual usage of all identified "dead code" with grep searches
- Found that most code in rate-limit.ts, storage.ts, and data.ts is ACTIVELY USED
- Removed only truly unused code: 3 functions from db-helpers.ts (~45 LOC)
- Updated todo with accurate findings
- Original estimate of 425 LOC dead code was incorrect - actual dead code was ~45 LOC
