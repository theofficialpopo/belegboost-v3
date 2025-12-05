---
status: pending
priority: p2
issue_id: "010"
tags: [performance, ux, frontend]
dependencies: []
---

# HIGH-6: Remove Artificial Loading Delay

## Problem Statement
The Overview component has an artificial 1.5 second delay before showing data, even when data is already available. This degrades user experience and violates Web Vitals metrics.

## Findings
- Discovered during performance audit
- Location: `components/dashboard/views/Overview.tsx` (Lines 25-30)

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 1500);  // Artificial delay!
  return () => clearTimeout(timer);
}, []);
```

## Impact
- Adds unnecessary 1.5s delay to every page load
- Poor user experience - data available but hidden
- Violates Web Vitals metrics (LCP, FID)

## Proposed Solution
Use actual data loading state or remove delay:

```typescript
// Option 1: Use real loading state from data fetching
const { data, isLoading } = useSubmissions();

// Option 2: For server components
export default async function OverviewPage() {
  const submissions = await getSubmissions(); // Actual async fetch
  return <Overview submissions={submissions} />;
}
```

## Impact
- **UX**: 1.5s improvement in perceived load time
- **Effort**: Small (30 minutes)
- **Risk**: Low

## Acceptance Criteria
- [ ] Artificial timeout removed
- [ ] Loading state reflects actual data availability
- [ ] Skeleton shown only during real loading
- [ ] User sees data immediately when available
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified artificial loading delay degrading UX
