---
status: pending
priority: p3
issue_id: "015"
tags: [compliance, logging, data-integrity]
dependencies: []
---

# MED-5: Implement Audit Logging

## Problem Statement
Despite having a comprehensive `audit_logs` table with actions defined, ZERO audit log entries are created in any of the API routes. This violates GDPR compliance requirements.

## Findings
- Discovered during data integrity review
- Location: All API routes in `app/api/`
- `audit_logs` table exists but is never populated

## Missing Audit Events
- `app/api/team/route.ts` - team_member_invited
- `app/api/team/[id]/route.ts` - team_member_removed
- `app/api/portal/submit/route.ts` - submission_created, file_uploaded
- `app/api/submissions/[id]/route.ts` - settings_changed
- `app/api/auth/register/route.ts` - registration events

## Compliance Risk
GDPR Article 30 requires maintaining records of processing activities. Without audit logs:
- Cannot prove who accessed/modified PII
- Cannot respond to GDPR Article 15 (right of access)
- Cannot investigate data breaches

## Proposed Solution
Create audit logging helper:

```typescript
// lib/audit.ts
export async function logAudit(
  tx: Transaction,
  data: {
    organizationId: string;
    userId: string;
    action: AuditAction;
    resourceType?: string;
    resourceId?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
  }
) {
  await tx.insert(auditLogs).values({
    ...data,
    createdAt: new Date(),
  });
}
```

## Impact
- **Compliance**: GDPR/CCPA compliance
- **Security**: Audit trail for investigations
- **Effort**: Large (1 week)
- **Risk**: Low

## Acceptance Criteria
- [ ] Audit helper function created
- [ ] All mutations create audit log entries
- [ ] Audit log includes IP address and user agent
- [ ] Tests verify audit log creation
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified missing audit logging implementation
