---
status: pending
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

### lib/db-helpers.ts (~120 LOC)
- Lines 27-35: `withOrgScope` - never called
- Lines 263-279: `countActiveTeamMembersForOrg` - never called
- Lines 374-400: `countExportsByStatusForOrg` - never called

### lib/rate-limit.ts (~100 LOC)
- Lines 101-114: Exponential backoff - never used
- Lines 119-140: Cleanup interval - over-engineered
- Lines 155-173: Statistics tracking - no monitoring dashboard
- Lines 268-277: Custom error class - barely used

### lib/data.ts (~146 LOC)
- Lines 27-130: Mock submissions data in production
- Lines 132-173: Mock team members in production

### lib/storage.ts (9 LOC)
- Lines 168-176: `uploadFile` wrapper that just calls `uploadFileToR2`

## Proposed Solution
1. Delete unused functions from db-helpers.ts
2. Simplify rate-limit.ts to ~60 lines
3. Move mock data to dev-only file
4. Remove wrapper function from storage.ts

## Impact
- **Bundle Size**: Smaller production bundle
- **Maintainability**: Less code to maintain
- **Clarity**: No confusion about what's used
- **Effort**: Medium (3 hours)
- **Risk**: Low

## Acceptance Criteria
- [ ] All unused exports removed
- [ ] Mock data moved to dev-only file
- [ ] Rate limiter simplified
- [ ] No functionality broken
- [ ] Tests pass
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified 425+ LOC of dead/unused code
