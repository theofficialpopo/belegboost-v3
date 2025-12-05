'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Filter } from 'lucide-react';
import Button from '../../ui/Button';
import { TeamRole } from '../../../types';
import { TeamMember as DBTeamMember } from '@/db/schema/team-members';
import TeamEditModal from '../modals/TeamEditModal';
import TeamMemberCard from '../team/TeamMemberCard';
import TeamMemberCardSkeleton from '../skeletons/TeamMemberCardSkeleton';
import { useDashboardFilter } from '../../../hooks';
import SearchFilterBar from '../../ui/SearchFilterBar';

interface TeamProps {
  teamMembers: DBTeamMember[];
}

const Team = ({ teamMembers: initialTeamMembers }: TeamProps) => {
  const [selectedMember, setSelectedMember] = useState<DBTeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized filter function
  const filterFn = useCallback(
    (member: DBTeamMember, search: string, f: { role: TeamRole | 'all'; status: 'all' | 'active' | 'invited' }) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        member.name.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        (member.jobTitle?.toLowerCase().includes(searchLower) ?? false);

      const matchesRole =
        f.role === 'all' ||
        (f.role === 'admin' && (member.role === 'admin' || member.role === 'owner')) ||
        (f.role === 'member' && member.role === 'member');

      const matchesStatus = f.status === 'all' || member.status === f.status;

      return matchesSearch && matchesRole && matchesStatus;
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
  } = useDashboardFilter<DBTeamMember, { role: TeamRole | 'all'; status: 'all' | 'active' | 'invited' }>(
    initialTeamMembers,
    filterFn,
    { role: 'all', status: 'all' }
  );

  const handleEdit = useCallback((member: DBTeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  }, []);

  const handleNew = useCallback(() => {
    setSelectedMember(null);
    setIsModalOpen(true);
  }, []);

  const roleOptions = useMemo(() => [
    { value: 'all' as const, label: 'Alle' },
    { value: 'admin' as const, label: 'Admins' },
    { value: 'member' as const, label: 'Mitarbeiter' },
  ], []);

  const statusOptions = useMemo(() => [
    { value: 'all' as const, label: 'Alle' },
    { value: 'active' as const, label: 'Aktiv' },
    { value: 'invited' as const, label: 'Eingeladen' },
  ], []);

  const filterGroups = useMemo(() => [
    {
      key: 'role' as const,
      label: 'Rolle',
      options: roleOptions,
    },
    {
      key: 'status' as const,
      label: 'Status',
      options: statusOptions,
    },
  ], [roleOptions, statusOptions]);

  return (
    <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">

      <TeamEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team Verwaltung</h1>
            <p className="text-slate-500 dark:text-slate-400">Verwalten Sie Zugriffsrechte und Mitarbeiter.</p>
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
            <Button size="sm" onClick={handleNew}>
                <Plus size={16} className="mr-2" /> Mitarbeiter einladen
            </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="Suchen nach Name, E-Mail oder Position..."
        showFilters={showFilters}
        filterGroups={filterGroups}
        currentFilters={filters}
        onFilterChange={updateFilter}
      />

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
                <TeamMemberCardSkeleton key={i} />
            ))
        ) : filteredItems.length > 0 ? (
            filteredItems.map((member) => (
                <TeamMemberCard
                    key={member.id}
                    member={member}
                    onEdit={handleEdit}
                />
            ))
        ) : (
             <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                 <p className="text-slate-500">Keine Mitarbeiter gefunden.</p>
                 <button onClick={resetFilters} className="text-primary-600 text-sm hover:underline mt-2">Suche zurücksetzen</button>
             </div>
        )}

        {!isLoading && (
            <button
                onClick={handleNew}
                className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-primary-400 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all min-h-[250px]"
            >
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Plus size={24} />
                </div>
                <span className="font-bold">Neuen Benutzer einladen</span>
            </button>
        )}
      </div>
    </div>
  );
};

export default Team;
