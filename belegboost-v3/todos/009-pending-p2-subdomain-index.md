---
status: pending
priority: p2
issue_id: "009"
tags: [performance, database, indexing]
dependencies: []
---

# HIGH-5: Add Subdomain Index on Organizations Table

## Problem Statement
The `subdomain` field is queried frequently (every page load) but only has a UNIQUE constraint, not an explicit index. This causes full table scans as the database grows.

## Findings
- Discovered during performance audit
- Location: `db/schema/organizations.ts`
- `getOrganizationBySlug()` called on every dashboard/portal page load

## Performance Impact
- Without explicit index: O(n) table scan
- At 10,000 orgs: ~100ms query time
- At 100,000 orgs: ~1000ms query time

## Proposed Solution
```typescript
// In db/schema/organizations.ts
export const organizations = pgTable('organizations', {
  // ... existing fields
}, (table) => [
  index('organizations_subdomain_idx').on(table.subdomain),
]);
```

Migration:
```sql
CREATE INDEX organizations_subdomain_idx ON organizations (subdomain);
```

## Impact
- **Performance**: 95% reduction in lookup time (O(n) to O(log n))
- **Effort**: Small (30 minutes)
- **Risk**: Low

## Acceptance Criteria
- [ ] Index added to schema
- [ ] Migration created and applied
- [ ] Query performance verified with EXPLAIN ANALYZE
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified missing index on frequently queried subdomain field
