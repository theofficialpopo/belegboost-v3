
import { useState } from 'react';

export function useDashboardFilter<T>(
  items: T[], 
  filterFn: (item: T, search: string, filters: any) => boolean,
  initialFilters: any = {}
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  const filteredItems = items.filter(item => filterFn(item, searchQuery, filters));

  const updateFilter = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
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
