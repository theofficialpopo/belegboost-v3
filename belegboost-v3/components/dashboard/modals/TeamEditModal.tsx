'use client';

import React, { useState, useEffect } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import IconInput from '../../ui/IconInput';
import { TeamMember as DBTeamMember } from '@/db/schema/team-members';
import { User, Mail, Briefcase, Eye, EyeOff, ShieldAlert, Users, Crown, Lock } from 'lucide-react';
import { useToast } from '../../../lib/ToastContext';
import { logError } from '@/lib/logger';

interface TeamEditModalProps {
  member: DBTeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onMemberDeleted?: () => void;
}

const TeamEditModal = ({ member, isOpen, onClose, onMemberDeleted }: TeamEditModalProps) => {
  const [formData, setFormData] = useState<Partial<DBTeamMember>>({});
  const [isVisible, setIsVisible] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (member) {
      setFormData({ ...member });
      setIsVisible(member.isPubliclyVisible);
    } else {
      setFormData({ role: 'member' });
      setIsVisible(true);
    }
  }, [member]);

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name?.trim()) {
      addToast({
        type: 'error',
        title: 'Fehler',
        message: 'Bitte geben Sie einen Namen ein',
      });
      return;
    }

    if (!formData.email?.trim()) {
      addToast({
        type: 'error',
        title: 'Fehler',
        message: 'Bitte geben Sie eine E-Mail-Adresse ein',
      });
      return;
    }

    // Generate avatar from name if not provided
    const avatar = formData.avatar || formData.name.substring(0, 2).toUpperCase();

    setIsSaving(true);

    try {
      const payload = {
        id: member?.id,
        name: formData.name,
        email: formData.email,
        jobTitle: formData.jobTitle || '',
        role: formData.role || 'member',
        avatar,
        isPubliclyVisible: isVisible,
      };

      const response = await fetch('/api/team', {
        method: member ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save team member');
      }

      addToast({
        type: 'success',
        title: 'Erfolg',
        message: member
          ? 'Mitarbeiter wurde erfolgreich aktualisiert'
          : 'Mitarbeiter wurde erfolgreich eingeladen',
      });

      onClose();

      // Refresh the page to show updated data
      window.location.reload();

    } catch (error) {
      logError('Error saving team member', error);
      addToast({
        type: 'error',
        title: 'Fehler',
        message: error instanceof Error ? error.message : 'Beim Speichern ist ein Fehler aufgetreten',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!member?.id) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/team/${member.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Löschen des Mitarbeiters');
      }

      addToast({
        type: 'success',
        title: 'Mitarbeiter gelöscht',
        message: `${member.name} wurde erfolgreich aus dem Team entfernt.`,
      });

      onClose();
      setShowDeleteConfirm(false);
      onMemberDeleted?.();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Fehler beim Löschen',
        message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const isOwner = formData.role === 'owner';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={member ? "Mitarbeiter bearbeiten" : "Mitarbeiter einladen"} maxWidth="max-w-lg">
      <div className="space-y-6">

        {/* Header Section */}
        <div className="flex items-start gap-5">
             <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-xl font-bold text-primary-700 dark:text-primary-400 shrink-0">
                 {formData.avatar || (formData.name ? formData.name.substring(0,2).toUpperCase() : '??')}
             </div>
             <div className="flex-grow grid grid-cols-2 gap-3">
                <IconInput
                    label="Name"
                    icon={User}
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Name"
                    containerClassName="col-span-1"
                />
                <IconInput
                    label="Titel"
                    icon={Briefcase}
                    value={formData.jobTitle || ''}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    placeholder="z.B. Steuerberater"
                    containerClassName="col-span-1"
                />
             </div>
        </div>

        <IconInput
            label="E-Mail Adresse"
            icon={Mail}
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="name@kanzlei.de"
        />

        {/* Role Selection */}
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Berechtigung
            </label>

            {isOwner ? (
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-3 flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-1.5 rounded-lg text-purple-700 dark:text-purple-400">
                        <Crown size={16} />
                    </div>
                    <div className="flex-grow">
                        <div className="text-sm font-bold text-purple-900 dark:text-purple-100">Kanzlei Inhaber</div>
                    </div>
                    <Lock size={14} className="text-purple-400" />
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setFormData({...formData, role: 'admin'})}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                            formData.role === 'admin'
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldAlert size={14} className={formData.role === 'admin' ? 'text-blue-600' : 'text-slate-400'} />
                            <div className="font-bold text-sm text-slate-900 dark:text-white">Admin</div>
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight">Vollzugriff & Einladungen.</div>
                    </button>

                    <button
                        onClick={() => setFormData({...formData, role: 'member'})}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                            formData.role === 'member'
                            ? 'bg-slate-100 dark:bg-slate-800 border-slate-500 ring-1 ring-slate-500'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Users size={14} className={formData.role === 'member' ? 'text-slate-700' : 'text-slate-400'} />
                            <div className="font-bold text-sm text-slate-900 dark:text-white">Mitglied</div>
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight">Standard Zugriff.</div>
                    </button>
                </div>
            )}
        </div>

        {/* Visibility Toggle */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsVisible(!isVisible)}>
            <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${isVisible ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                    {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                </div>
                <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Im Portal anzeigen</div>
                    <div className="text-[10px] text-slate-500">Sichtbar für Mandanten beim Upload</div>
                </div>
            </div>

            {/* Switch UI */}
            <div className={`w-8 h-5 rounded-full p-0.5 transition-colors duration-200 ${isVisible ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${isVisible ? 'translate-x-3' : 'translate-x-0'}`} />
            </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
             {member && !isOwner && (
                 <Button
                   variant="outline"
                   size="sm"
                   className="text-red-500 hover:text-red-600 hover:border-red-200"
                   onClick={() => setShowDeleteConfirm(true)}
                   disabled={isDeleting}
                 >
                     Löschen
                 </Button>
             )}
             <div className="flex-grow"></div>
             <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving}>Abbrechen</Button>
             <Button variant="primary" size="sm" onClick={handleSave} disabled={isSaving}>
               {isSaving ? 'Wird gespeichert...' : 'Speichern'}
             </Button>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <Modal
          isOpen={showDeleteConfirm}
          onClose={() => !isDeleting && setShowDeleteConfirm(false)}
          title="Mitarbeiter löschen?"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-400">
              Möchten Sie <strong>{formData.name}</strong> wirklich aus dem Team entfernen?
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>

            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex-grow"></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Abbrechen
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Wird gelöscht...' : 'Löschen'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default TeamEditModal;
