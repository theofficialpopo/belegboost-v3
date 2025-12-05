---
status: pending
priority: p3
issue_id: "016"
tags: [code-quality, duplication, frontend]
dependencies: []
---

# MED-7: Extract Shared SearchFilterBar Component

## Problem Statement
Both `Overview.tsx` and `Team.tsx` components implement nearly identical search/filter interfaces with ~80-100 lines of duplicated JSX.

## Findings
- Discovered during pattern recognition review
- Locations:
  - `components/dashboard/views/Overview.tsx` (Lines 116-156)
  - `components/dashboard/views/Team.tsx` (Lines 119-184)

## Duplicated Elements
1. Search input with Search icon and clear button
2. Filter toggle button with Filter icon
3. Filter chips UI pattern
4. Identical Tailwind classes for styling
5. Same animation classes

## Proposed Solution
Extract to shared component:

```typescript
// components/ui/SearchFilterBar.tsx
interface SearchFilterBarProps<F> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPlaceholder?: string;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterGroups: FilterGroup<F>[];
  currentFilters: F;
  onFilterChange: (key: keyof F, value: F[keyof F]) => void;
}

export function SearchFilterBar<F>({...}: SearchFilterBarProps<F>) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search input */}
      {/* Filter toggle */}
      {/* Filter chips */}
    </div>
  );
}
```

## Impact
- **Maintainability**: Single component to update
- **Consistency**: Guaranteed UI consistency
- **LOC**: ~100 lines saved
- **Effort**: Medium (3 hours)
- **Risk**: Low

## Acceptance Criteria
- [ ] SearchFilterBar component created
- [ ] Overview.tsx refactored to use component
- [ ] Team.tsx refactored to use component
- [ ] All existing functionality preserved
- [ ] Tests pass
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified duplicated search/filter UI code
