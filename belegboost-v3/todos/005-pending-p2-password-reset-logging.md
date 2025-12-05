---
status: pending
priority: p2
issue_id: "005"
tags: [security, logging, sensitive-data]
dependencies: []
---

# HIGH-1: Remove Password Reset Token from Production Logs

## Problem Statement
Password reset tokens and URLs are logged unconditionally, including in production environments. This exposes sensitive data in application logs.

## Findings
- Discovered during security audit
- Location: `app/api/auth/forgot-password/route.ts` (Line 48)

```typescript
logger.info('Password reset link generated', {
  email, resetUrl, resetExpires: resetExpires.toISOString()
});
```

## Security Risk
- Reset tokens exposed in application logs
- Anyone with log access can hijack password reset flows
- Could lead to account takeover

## Proposed Solution
```typescript
if (process.env.NODE_ENV === 'development') {
  logger.info('Password reset link generated (DEV ONLY)', {
    email, resetUrl, resetExpires: resetExpires.toISOString()
  });
} else {
  logger.info('Password reset initiated', {
    email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Partial masking
    resetExpires: resetExpires.toISOString()
  });
}
```

## Impact
- **Security Risk**: HIGH - Token exposure enables account takeover
- **Effort**: Small (30 minutes)
- **Risk**: Low

## Acceptance Criteria
- [ ] Reset tokens never logged in production
- [ ] Email addresses partially masked in production logs
- [ ] Development mode still logs full details for debugging
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified sensitive data exposure in logs
