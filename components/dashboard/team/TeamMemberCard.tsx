import React from 'react';
import { Mail, Shield, Eye, EyeOff, Crown, ShieldAlert, User } from 'lucide-react';
import Button from '../../ui/Button';
import { TeamMember } from '../../../types';

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (m: TeamMember) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onEdit }) => {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return { label: 'Inhaber', icon: Crown, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' };
      case 'admin':
        return { label: 'Admin', icon: ShieldAlert, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };
      default:
        return { label: 'Mitglied', icon: User, color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' };
    }
  };

  const roleBadge = getRoleBadge(member.role);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all relative group">
        
        {/* Visibility Badge */}
        <div className={`absolute top-6 right-6 p-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${
            member.isPubliclyVisible 
            ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}>
            {member.isPubliclyVisible ? <Eye size={12} /> : <EyeOff size={12} />}
            {member.isPubliclyVisible ? 'Öffentlich' : 'Versteckt'}
        </div>

        <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-lg">
                {member.avatar}
            </div>
        </div>
        
        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{member.name}</h3>
        <p className="text-sm font-medium text-slate-500 mb-2">{member.jobTitle}</p>
        
        {/* Role Badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${roleBadge.color}`}>
            <roleBadge.icon size={12} />
            {roleBadge.label}
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 truncate">
                <Mail size={14} className="shrink-0" /> {member.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Shield size={14} className="shrink-0" /> Status: {member.status === 'active' ? 'Aktiv' : 'Eingeladen'}
            </div>
        </div>

        <div className="mt-6">
            <Button variant="outline" size="sm" fullWidth onClick={() => onEdit(member)}>
                Profil bearbeiten
            </Button>
        </div>
    </div>
  );
};

export default TeamMemberCard;
