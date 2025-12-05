---
status: pending
priority: p1
issue_id: "003"
tags: [database, data-integrity, schema]
dependencies: []
---

# CRIT-3: Add Composite Unique Constraint on teamMembers

## Problem Statement
The `teamMembers` table lacks a composite unique constraint on `(email, organizationId)`. This allows the same email to be added multiple times to the same organization, creating duplicate team member records.

## Findings
- Discovered during data integrity review
- Location: `db/schema/team-members.ts`
- No unique constraint on email + organizationId combination

## Data Corruption Scenario
```typescript
// Both succeed, creating duplicates:
await db.insert(teamMembers).values({
  organizationId: 'org-123',
  email: 'john@example.com',
  name: 'John Doe',
  role: 'member'
});

await db.insert(teamMembers).values({
  organizationId: 'org-123',
  email: 'john@example.com',  // Same email, same org!
  name: 'Johnny Doe',
  role: 'admin'
});
```

## Proposed Solution
```typescript
// In db/schema/team-members.ts
export const teamMembers = pgTable('team_members', {
  // ... existing fields
}, (table) => [
  index('team_members_org_idx').on(table.organizationId),
  unique('team_members_org_email_unique').on(table.organizationId, table.email), // ADD THIS
]);
```

## Impact
- **Data Risk**: HIGH - Duplicate records cause confusion and bugs
- **Effort**: Small (1 hour including migration)
- **Risk**: Medium - Need to check for existing duplicates

## Acceptance Criteria
- [ ] Migration created to add unique constraint
- [ ] Check for existing duplicate records before migration
- [ ] Clean up any existing duplicates
- [ ] Migration applied successfully
- [ ] API returns appropriate error for duplicate attempts

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified missing unique constraint on team_members table
