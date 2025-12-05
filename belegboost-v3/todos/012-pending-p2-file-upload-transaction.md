---
status: pending
priority: p2
issue_id: "012"
tags: [data-integrity, storage, transaction]
dependencies: []
---

# HIGH-8: Fix File Upload Transaction Handling

## Problem Statement
Files are uploaded to S3/R2 INSIDE the database transaction. If the transaction rolls back after files are uploaded, the files remain in storage as orphans, consuming storage costs.

## Findings
- Discovered during data integrity review
- Location: `app/api/portal/submit/route.ts` (Lines 83-153)

```typescript
const result = await db.transaction(async (tx) => {
  const [submission] = await tx.insert(submissions)...

  // Upload to R2 (EXTERNAL SYSTEM!)
  const { s3Key } = await uploadFile(dataFile, {...});

  // If THIS fails, transaction rolls back but files remain in R2!
  await tx.insert(files)...
});
```

## Orphaned File Scenario
1. Transaction uploads file to R2 (succeeds)
2. File record insertion fails (DB error)
3. Transaction rolls back → submission deleted
4. File remains in R2 forever (orphaned)

## Proposed Solution
Two-phase commit pattern:

```typescript
const uploadedFiles = [];
try {
  // Upload files BEFORE transaction
  if (dataFile) {
    const result = await uploadFile(dataFile, {...});
    uploadedFiles.push(result);
  }

  // Wrap DB operations in transaction
  const result = await db.transaction(async (tx) => {
    // Create submission and file records
  });

} catch (error) {
  // Cleanup uploaded files on failure
  for (const file of uploadedFiles) {
    await deleteFileFromR2(file.s3Key).catch(console.error);
  }
  throw error;
}
```

## Impact
- **Data Integrity**: Prevents orphaned files
- **Cost**: Prevents storage waste
- **Effort**: Medium (4 hours)
- **Risk**: Medium

## Acceptance Criteria
- [ ] Files uploaded before transaction
- [ ] Failed transactions clean up uploaded files
- [ ] No orphaned files in storage
- [ ] Tests verify cleanup on failure
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified orphaned file risk in transaction handling
