---
status: pending
priority: p2
issue_id: "013"
tags: [code-quality, logging, security]
dependencies: []
---

# HIGH-9: Replace console.log with Structured Logger

## Problem Statement
Direct `console.log/error` calls exist in production code instead of using the structured logger utility. This exposes internal details and makes log analysis difficult.

## Findings
- Discovered during pattern recognition and TypeScript review
- 11 files with direct console usage

## Affected Files
1. `components/auth/SignUp.tsx` - Line 114
2. `components/auth/ForgotPassword.tsx` - Multiple lines
3. `components/dashboard/modals/TeamEditModal.tsx` - Line 100
4. `components/dashboard/modals/SubmissionDetailModal.tsx` - Line 60
5. `hooks/usePortalForm.ts` - Lines 76, 80
6. `hooks/useLocalStorage.ts` - Lines 23, 37
7. `lib/storage.ts` - Lines 120, 153, 160
8. `lib/csrf.ts` - Lines 84, 93, 106

## Proposed Solution
Replace all `console.*` calls with logger:

```typescript
// Before
console.log('Submission successful:', result);
console.error('Error saving submission:', error);

// After
import { logger } from '@/lib/logger';
logger.info('Submission successful', { submissionId: result.id });
logger.error('Error saving submission', error);
```

## Impact
- **Security**: Prevents information disclosure
- **Maintainability**: Consistent log format
- **Effort**: Small (2 hours)
- **Risk**: Low

## Acceptance Criteria
- [ ] All console.log replaced with logger.info
- [ ] All console.error replaced with logger.error
- [ ] All console.warn replaced with logger.warn
- [ ] No sensitive data in log messages
- [ ] ESLint rule to prevent future console usage (optional)
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified inconsistent logging across codebase
