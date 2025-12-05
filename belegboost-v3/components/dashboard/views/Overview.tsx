'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Download, Search, Filter, X } from 'lucide-react';
import Button from '../../ui/Button';
import { Submission, SubmissionStatus } from '../../../types';
import SubmissionDetailModal from '../modals/SubmissionDetailModal';
import OverviewHeader from '../overview/OverviewHeader';
import SubmissionRow from '../overview/SubmissionRow';
import SubmissionRowSkeleton from '../skeletons/SubmissionRowSkeleton';
import { useDashboardFilter } from '../../../hooks';
import { useToastActions } from '../../../lib/ToastContext';

interface OverviewProps {
  submissions: Submission[];
}

const Overview: React.FC<OverviewProps> = ({ submissions }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToastActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Memoized filter function
  const filterFn = useCallback(
    (sub: Submission, search: string, f: { status: SubmissionStatus | 'all' }) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        sub.clientName.toLowerCase().includes(searchLower) ||
        sub.clientNumber.includes(search) ||
        sub.provider.toLowerCase().includes(searchLower);

      const matchesStatus = f.status === 'all' || sub.status === f.status;

      return matchesSearch && matchesStatus;
    },
    []
  );

  const {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    resetFilters,
    filteredItems
  } = useDashboardFilter<Submission, { status: SubmissionStatus | 'all' }>(
    submissions,
    filterFn,
    { status: 'all' }
  );

  const handleOpenDetail = useCallback((submission: Submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  }, []);

  const handleExportAll = useCallback(() => {
    addToast({
      type: 'info',
      title: 'Export gestartet',
      message: `${filteredItems.length} Dateien werden vorbereitet...`
    });
  }, [addToast, filteredItems.length]);

  const gridLayoutClass = "grid grid-cols-[3fr_1.5fr_1fr_1.2fr_1.2fr_2fr] gap-4 items-center px-4";

  const statusOptions = useMemo(() => [
    { value: 'all' as const, label: 'Alle' },
    { value: 'new' as const, label: 'Neu' },
    { value: 'review' as const, label: 'In Prüfung' },
    { value: 'exported' as const, label: 'Exportiert' },
  ], []);

  return (
    <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">

      <SubmissionDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submission={selectedSubmission}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Übersicht</h1>
            <p className="text-slate-500 dark:text-slate-400">Verwalten Sie eingehende Beleg-Exporte Ihrer Mandanten.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button
                variant={showFilters ? 'secondary' : 'outline'}
                size="sm"
                className="bg-white dark:bg-slate-800"
                onClick={() => setShowFilters(!showFilters)}
            >
                <Filter size={16} className="mr-2" /> Filter
            </Button>
            <Button variant="primary" size="sm" onClick={handleExportAll}>
                <Download size={16} className="mr-2" /> Alle Exportieren
            </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suchen nach Mandant, Datei oder Datum..."
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

        {/* Status Filter Chips */}
        {showFilters && (
            <div className="flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
                <span className="text-xs font-bold text-slate-500 mr-2">Status:</span>
                {statusOptions.map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => updateFilter('status', value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            filters.status === value
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        )}
      </div>

      {/* Table Header */}
      <OverviewHeader gridClass={gridLayoutClass} />

      {/* Submission List */}
      <div className="space-y-2">
        {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
                <SubmissionRowSkeleton key={i} gridClass={gridLayoutClass} />
            ))
        ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-500">Keine Einträge gefunden.</p>
                {(searchQuery || filters.status !== 'all') && (
                    <button
                        onClick={resetFilters}
                        className="text-primary-600 text-sm font-medium hover:underline mt-2"
                    >
                        Filter zurücksetzen
                    </button>
                )}
            </div>
        ) : (
            filteredItems.map((submission) => (
                <SubmissionRow
                    key={submission.id}
                    submission={submission}
                    onClick={handleOpenDetail}
                    gridClass={gridLayoutClass}
                />
            ))
        )}
      </div>
    </div>
  );
};

export default Overview;
