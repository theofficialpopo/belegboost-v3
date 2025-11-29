import { useState } from 'react';

// T = Type of the Item (e.g. Submission)
// F = Type of the Filter Object (e.g. { status: 'new' })
export function useDashboardFilter<T, F>(
  items: T[], 
  filterFn: (item: T, search: string, filters: F) => boolean,
  initialFilters: F
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<F>(initialFilters);

  const filteredItems = items.filter(item => filterFn(item, searchQuery, filters));

  // K extends keyof F ensures we can only update keys that actually exist in the filter object
  const updateFilter = <K extends keyof F>(key: K, value: F[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilters(initialFilters);
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    resetFilters,
    filteredItems
  };
}