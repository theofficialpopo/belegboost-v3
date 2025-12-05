'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Download, Filter } from 'lucide-react';
import Button from '../../ui/Button';
import { Submission, SubmissionStatus } from '../../../types';
import SubmissionDetailModal from '../modals/SubmissionDetailModal';
import OverviewHeader from '../overview/OverviewHeader';
import SubmissionRow from '../overview/SubmissionRow';
import SubmissionRowSkeleton from '../skeletons/SubmissionRowSkeleton';
import { useDashboardFilter } from '../../../hooks';
import { useToastActions } from '../../../lib/ToastContext';
import SearchFilterBar from '../../ui/SearchFilterBar';

interface OverviewProps {
  submissions: Submission[];
}

const Overview = ({ submissions }: OverviewProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastActions();

  // Memoized filter function
  const filterFn = useCallback(
    (sub: Submission, search: string, f: { status: SubmissionStatus | 'all' }) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        sub.clientName.toLowerCase().includes(searchLower) ||
        (sub.clientNumber?.includes(search) ?? false) ||
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

  const filterGroups = useMemo(() => [
    {
      key: 'status' as const,
      label: 'Status',
      options: statusOptions,
    },
  ], [statusOptions]);

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
      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="Suchen nach Mandant, Datei oder Datum..."
        showFilters={showFilters}
        filterGroups={filterGroups}
        currentFilters={filters}
        onFilterChange={updateFilter}
      />

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
