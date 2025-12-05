'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Search, X, Filter } from 'lucide-react';
import Button from '../../ui/Button';
import { TeamRole } from '../../../types';
import { TeamMember as DBTeamMember } from '@/db/schema/team-members';
import TeamEditModal from '../modals/TeamEditModal';
import TeamMemberCard from '../team/TeamMemberCard';
import TeamMemberCardSkeleton from '../skeletons/TeamMemberCardSkeleton';
import { useDashboardFilter } from '../../../hooks';

interface TeamProps {
  teamMembers: DBTeamMember[];
}

const Team: React.FC<TeamProps> = ({ teamMembers: initialTeamMembers }) => {
  const [selectedMember, setSelectedMember] = useState<DBTeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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
                placeholder="Suchen nach Name, E-Mail oder Position..."
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

        {/* Filters */}
        {showFilters && (
            <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-top-2 fade-in duration-200">

                {/* Role Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 mr-1">Rolle:</span>
                    {roleOptions.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => updateFilter('role', value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                filters.role === value
                                ? 'bg-primary-600 text-white shadow-md'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 mr-1">Status:</span>
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

            </div>
        )}
      </div>

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
