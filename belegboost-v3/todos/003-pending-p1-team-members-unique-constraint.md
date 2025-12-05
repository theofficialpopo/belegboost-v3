---
status: completed
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
- [x] Migration created to add unique constraint
- [x] Check for existing duplicate records before migration
- [x] Clean up any existing duplicates
- [x] Migration applied successfully
- [x] API returns appropriate error for duplicate attempts

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified missing unique constraint on team_members table

### 2025-12-05 - Implementation Complete
**By:** Claude Code
**Actions:**
- Updated `db/schema/team-members.ts` to add unique constraint on (organizationId, email)
- Created migration `db/migrations/0001_add_team_members_unique_constraint.sql` with duplicate check
- Updated `app/api/team/route.ts` POST endpoint with proactive duplicate checking
- Updated `app/api/team/route.ts` PATCH endpoint with email conflict checking
- Added fallback database error handling for unique constraint violations
- Returns 409 Conflict with user-friendly message when duplicate email detected
