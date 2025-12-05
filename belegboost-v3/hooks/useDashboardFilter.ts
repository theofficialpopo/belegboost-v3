'use client';

import { useState, useMemo, useCallback } from 'react';

/**
 * Generic hook for filtering and searching dashboard data
 * @param items - Array of items to filter
 * @param filterFn - Function to determine if an item matches the filter criteria
 * @param initialFilters - Initial filter state
 *
 * T = Type of the Item (e.g. Submission)
 * F = Type of the Filter Object (e.g. { status: 'new' })
 */
export function useDashboardFilter<T, F>(
  items: T[],
  filterFn: (item: T, search: string, filters: F) => boolean,
  initialFilters: F
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<F>(initialFilters);

  // Memoize filtered items to prevent recalculation on every render
  const filteredItems = useMemo(
    () => items.filter(item => filterFn(item, searchQuery, filters)),
    [items, filterFn, searchQuery, filters]
  );

  // K extends keyof F ensures we can only update keys that actually exist in the filter object
  const updateFilter = useCallback(<K extends keyof F>(key: K, value: F[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setFilters(initialFilters);
  }, [initialFilters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    resetFilters,
    filteredItems
  };
}
