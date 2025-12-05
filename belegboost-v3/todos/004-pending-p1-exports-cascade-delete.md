---
status: pending
priority: p1
issue_id: "004"
tags: [database, data-integrity, schema]
dependencies: []
---

# CRIT-4: Fix CASCADE DELETE on exports.createdBy

## Problem Statement
The `exports.created_by` foreign key has incorrect cascade behavior. Currently set to `ON DELETE CASCADE`, which means deleting a user will delete ALL their exports. This destroys financial audit trail data.

## Findings
- Discovered during data integrity review
- Location: `db/schema/exports.ts` (Line 12)
- Current: `onDelete: 'cascade'`
- Should be: `onDelete: 'set null'`

## Data Loss Scenario
1. User creates export for submission (critical financial data)
2. Admin removes user from organization
3. CASCADE DELETE triggers: User deleted → ALL exports deleted
4. Financial audit trail is permanently destroyed

## Proposed Solution
```typescript
// In db/schema/exports.ts
createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' })
```

Migration required:
```sql
ALTER TABLE exports
DROP CONSTRAINT exports_created_by_users_id_fk,
ADD CONSTRAINT exports_created_by_users_id_fk
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
```

## Impact
- **Data Risk**: CRITICAL - Permanent data loss of financial records
- **Effort**: Small (1 hour)
- **Risk**: Low - Non-destructive change

## Acceptance Criteria
- [ ] Migration created to change CASCADE to SET NULL
- [ ] Migration applied successfully
- [ ] Verify existing exports preserved when user deleted
- [ ] Audit logs show user deletion doesn't cascade to exports

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified dangerous CASCADE DELETE behavior on exports table
