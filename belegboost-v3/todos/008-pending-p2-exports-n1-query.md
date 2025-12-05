---
status: pending
priority: p2
issue_id: "008"
tags: [performance, database, query-optimization]
dependencies: []
---

# HIGH-4: Fix N+1 Query in getExportsForOrg

## Problem Statement
The `getExportsForOrg()` function fetches ALL exports from the database and then filters in JavaScript, causing severe performance degradation at scale.

## Findings
- Discovered during performance audit
- Location: `lib/db-helpers.ts` (Lines 317-330)

```typescript
// PROBLEM: Fetches ALL exports, filters in memory
const allExports = await db.query.exports.findMany({...});
return allExports.filter(exp =>
  exp.submission && exp.submission.organizationId === organizationId
);
```

## Performance Impact
- At 10 orgs with 100 exports each: Fetches 1,000 rows, returns 100 (90% waste)
- At 100 orgs: Fetches 10,000 rows, returns 100 (99% waste)
- Memory usage: Unbounded - loads entire exports table

## Proposed Solution
Use JOIN to filter at database level:

```typescript
export async function getExportsForOrg(organizationId: string, options?: {...}) {
  const conditions: SQL[] = [eq(submissions.organizationId, organizationId)];

  if (options?.status) conditions.push(eq(exports.status, options.status));
  if (options?.format) conditions.push(eq(exports.format, options.format));

  return db
    .select()
    .from(exports)
    .innerJoin(submissions, eq(exports.submissionId, submissions.id))
    .where(and(...conditions))
    .orderBy(desc(exports.createdAt))
    .limit(options?.limit);
}
```

## Impact
- **Performance**: 90-99% reduction in query time and memory at scale
- **Effort**: Small (2 hours)
- **Risk**: Low

## Acceptance Criteria
- [ ] Query uses JOIN to filter at database level
- [ ] Only org-specific exports returned
- [ ] Performance tested with large dataset
- [ ] Existing functionality unchanged
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified N+1 query pattern in exports function
