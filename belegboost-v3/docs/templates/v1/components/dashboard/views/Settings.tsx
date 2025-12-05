import React from 'react';
import Button from '../../ui/Button';
import IconInput from '../../ui/IconInput';
import { User, Mail, Bell, Building } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Einstellungen</h1>
        <p className="text-slate-500 dark:text-slate-400">Passen Sie Ihr Profil und Kanzlei-Einstellungen an.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">Profil</h2>
        <div className="space-y-6">
            <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-2xl font-bold text-primary-700 dark:text-primary-400">
                    SW
                </div>
                <Button variant="outline" size="sm">Foto ändern</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IconInput label="Vorname" icon={User} defaultValue="Stefan" />
                <IconInput label="Nachname" icon={User} defaultValue="Weiss" />
            </div>
            <IconInput label="E-Mail Adresse" icon={Mail} defaultValue="stefan.weiss@kanzlei.de" disabled />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">Benachrichtigungen</h2>
        <div className="space-y-4">
            {[
                'E-Mail bei neuem Beleg-Eingang',
                'Tägliche Zusammenfassung per E-Mail',
                'Benachrichtigung bei Fehlerhaften Uploads'
            ].map((label, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-600" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{label}</span>
                </label>
            ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button>Speichern</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;