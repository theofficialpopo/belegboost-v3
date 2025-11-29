import { useState } from 'react';

export function useDashboardFilter<T, F>(
  items: T[], 
  filterFn: (item: T, search: string, filters: F) => boolean,
  initialFilters: F
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<F>(initialFilters);

  const filteredItems = items.filter(item => filterFn(item, searchQuery, filters));

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