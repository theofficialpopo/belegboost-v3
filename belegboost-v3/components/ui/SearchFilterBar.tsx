'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface FilterOption<T> {
  value: T;
  label: string;
}

interface FilterGroup<F extends Record<string, any>> {
  key: keyof F;
  label: string;
  options: FilterOption<F[keyof F]>[];
}

interface SearchFilterBarProps<F extends Record<string, any>> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPlaceholder?: string;
  showFilters: boolean;
  filterGroups: FilterGroup<F>[];
  currentFilters: F;
  onFilterChange: <K extends keyof F>(key: K, value: F[K]) => void;
}

export function SearchFilterBar<F extends Record<string, any>>({
  searchQuery,
  setSearchQuery,
  searchPlaceholder = 'Suchen...',
  showFilters,
  filterGroups,
  currentFilters,
  onFilterChange,
}: SearchFilterBarProps<F>) {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-shadow shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
          {filterGroups.map((group, groupIndex) => (
            <React.Fragment key={String(group.key)}>
              {/* Separator (except before first group) */}
              {groupIndex > 0 && (
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
              )}

              {/* Filter Group */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-1">
                  {group.label}:
                </span>
                {group.options.map((option) => (
                  <button
                    key={String(option.value)}
                    onClick={() => onFilterChange(group.key, option.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      currentFilters[group.key] === option.value
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchFilterBar;
