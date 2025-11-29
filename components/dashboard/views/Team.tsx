
import React, { useState } from 'react';
import { Plus, Search, X, Filter } from 'lucide-react';
import Button from '../../ui/Button';
import { TEAM_MEMBERS, TeamMember } from '../../../lib/dashboard-data';
import TeamEditModal from '../modals/TeamEditModal';
import TeamMemberCard from '../team/TeamMemberCard';

const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'member'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'invited'>('all');

  const filteredMembers = TEAM_MEMBERS.filter(member => {
      // 1. Search Logic
      const matchesSearch = 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Role Filter Logic
      const matchesRole = roleFilter === 'all' || 
                          (roleFilter === 'admin' && (member.role === 'admin' || member.role === 'owner')) ||
                          (roleFilter === 'member' && member.role === 'member');
      
      // 3. Status Filter Logic
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEdit = (member: TeamMember) => {
      setSelectedMember(member);
      setIsModalOpen(true);
  };

  const handleNew = () => {
      setSelectedMember(null);
      setIsModalOpen(true);
  };

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

        {/* Filters (Role & Status) */}
        {showFilters && (
            <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
                
                {/* Role Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 mr-1">Rolle:</span>
                    {(['all', 'admin', 'member'] as const).map(role => (
                        <button
                            key={role}
                            onClick={() => setRoleFilter(role)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                roleFilter === role 
                                ? 'bg-primary-600 text-white shadow-md' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            {role === 'all' ? 'Alle' : role === 'admin' ? 'Admins' : 'Mitarbeiter'}
                        </button>
                    ))}
                </div>

                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 mr-1">Status:</span>
                    {(['all', 'active', 'invited'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                statusFilter === status 
                                ? 'bg-primary-600 text-white shadow-md' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            {status === 'all' ? 'Alle' : status === 'active' ? 'Aktiv' : 'Eingeladen'}
                        </button>
                    ))}
                </div>

            </div>
        )}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
            <TeamMemberCard 
                key={member.id} 
                member={member} 
                onEdit={handleEdit} 
            />
        ))}
        
        {/* Empty State */}
        {filteredMembers.length === 0 && (
             <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                 <p className="text-slate-500">Keine Mitarbeiter gefunden.</p>
                 <button onClick={() => { setSearchQuery(''); setRoleFilter('all'); setStatusFilter('all'); }} className="text-primary-600 text-sm hover:underline mt-2">Suche zurücksetzen</button>
             </div>
        )}

        <button 
            onClick={handleNew}
            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-primary-400 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all min-h-[250px]"
        >
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Plus size={24} />
            </div>
            <span className="font-bold">Neuen Benutzer einladen</span>
        </button>
      </div>
    </div>
  );
};

export default Team;
