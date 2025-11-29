import React from 'react';
import { Calendar, Hash, Download } from 'lucide-react';
import IconInput from '../../../ui/IconInput';
import Button from '../../../ui/Button';
import { Submission } from '../../../../types';
import { getAdvisorById } from '../../../../lib/data';

interface SubmissionOverviewTabProps {
  submission: Submission;
  datevAccount: string;
  setDatevAccount: (val: string) => void;
}

const SubmissionOverviewTab: React.FC<SubmissionOverviewTabProps> = ({ submission, datevAccount, setDatevAccount }) => {
  const advisor = getAdvisorById(submission.assignedAdvisor);
  const advisorName = advisor ? advisor.name : submission.assignedAdvisor;

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl">
                <label className="text-xs text-slate-400 block mb-1">Zeitraum</label>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Calendar size={14} className="text-primary-500" />
                    {submission.period}
                </div>
            </div>
            <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl">
                <label className="text-xs text-slate-400 block mb-1">Zugewiesener Berater</label>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-[10px] text-primary-600 dark:text-primary-400 font-bold">
                        {submission.assignedAdvisor}
                    </div>
                    {advisorName}
                </div>
            </div>
        </div>

        {/* DATEV Account Input */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h5 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Hash size={16} className="text-primary-500" />
                DATEV Zuordnung
            </h5>
            <div className="flex items-end gap-3">
                <IconInput 
                    label="Kassenkonto"
                    placeholder="z.B. 1200 oder 1800"
                    value={datevAccount}
                    onChange={(e) => setDatevAccount(e.target.value)}
                    containerClassName="flex-grow"
                />
                <Button variant="secondary" className="mb-px py-2.5">
                    Zuordnung prüfen
                </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
                Dieses Konto wird im Buchungsstapel als Kassenkonto für alle Transaktionen verwendet.
            </p>
        </div>

        {/* File Preview */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h5 className="font-bold text-slate-900 dark:text-white mb-3">Dateien</h5>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 flex items-center justify-between group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-600 dark:text-green-400">
                        <Download size={16} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">Export_{submission.provider}_{submission.id}.csv</div>
                        <div className="text-xs text-slate-500">142 KB • Hochgeladen vor 2 Std.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SubmissionOverviewTab;