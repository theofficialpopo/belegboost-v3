
import React, { useState, useEffect } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { Submission } from '../../../lib/dashboard-data';
import { CreditCard, ArrowRight, LayoutList, List } from 'lucide-react';
import SubmissionOverviewTab from './submission/SubmissionOverviewTab';
import SubmissionTransactionsTab from './submission/SubmissionTransactionsTab';

interface SubmissionDetailModalProps {
  submission: Submission | null;
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({ submission, isOpen, onClose }) => {
  const [datevAccount, setDatevAccount] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');

  useEffect(() => {
    if (submission) {
      setDatevAccount(submission.datevAccount || '');
      setActiveTab('overview');
    }
  }, [submission]);

  if (!submission) return null;

  const handleSave = () => {
    // TODO: Backend save logic
    console.log(`Saving DATEV Account ${datevAccount} for submission ${submission.id}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mandanten-Export Details" maxWidth="max-w-2xl">
      <div className="flex flex-col h-full">
        
        {/* Header Summary - Always Visible */}
        <div className="flex items-start justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-6 shrink-0">
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-white">{submission.clientName}</h4>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <span>#{submission.clientNumber}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><CreditCard size={12} /> {submission.provider}</span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-sm text-slate-500">Endsaldo</div>
             <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">{submission.endBalance}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6 shrink-0">
            <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'overview' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
                <LayoutList size={16} /> Übersicht
            </button>
            <button
                onClick={() => setActiveTab('transactions')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'transactions' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
                <List size={16} /> Transaktionen <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-600 rounded-md text-xs">{submission.transactionCount}</span>
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow min-h-[300px]">
            {activeTab === 'overview' && (
                <SubmissionOverviewTab 
                    submission={submission} 
                    datevAccount={datevAccount} 
                    setDatevAccount={setDatevAccount} 
                />
            )}

            {activeTab === 'transactions' && (
                <SubmissionTransactionsTab transactionCount={submission.transactionCount} />
            )}
        </div>

        {/* Footer Actions - Sticky */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex gap-3">
                <Button variant="outline" fullWidth onClick={onClose}>
                    Abbrechen
                </Button>
                <Button variant="primary" fullWidth onClick={handleSave}>
                    Speichern & Exportieren <ArrowRight size={16} className="ml-2" />
                </Button>
            </div>
        </div>

      </div>
    </Modal>
  );
};

export default SubmissionDetailModal;
