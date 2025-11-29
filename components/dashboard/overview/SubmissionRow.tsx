import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { Submission } from '../../../types';
import { getAdvisorById } from '../../../lib/data';
import { formatDisplayPeriod, getStatusConfig } from '../../../lib/utils';

interface SubmissionRowProps {
  submission: Submission;
  onClick: (s: Submission) => void;
  gridClass: string;
}

const SubmissionRow: React.FC<SubmissionRowProps> = ({ submission, onClick, gridClass }) => {
  const status = getStatusConfig(submission.status);
  
  const advisor = getAdvisorById(submission.assignedAdvisor);
  const advisorName = advisor ? advisor.name : submission.assignedAdvisor;

  return (
    <div 
        onClick={() => onClick(submission)}
        className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800/50 transition-all duration-200 cursor-pointer h-20 ${gridClass}`}
    >
        {/* 1. Client Info */}
        <div className="flex flex-col justify-center min-w-0">
            <h3 className="font-bold text-slate-900 dark:text-white text-base truncate mb-0.5" title={submission.clientName}>
                {submission.clientName}
            </h3>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="font-semibold text-slate-600 dark:text-slate-400">{submission.provider}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>#{submission.clientNumber}</span>
            </div>
        </div>

        {/* 2. Advisor */}
        <div className="hidden md:flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-2.5 font-medium text-slate-700 dark:text-slate-300">
                <div className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-500 shrink-0">
                    {submission.assignedAdvisor}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="truncate text-sm font-bold text-slate-600 dark:text-slate-300" title={advisorName}>{advisorName}</span>
                    <span className="text-[10px] text-slate-400 truncate">Verantwortlich</span>
                </div>
            </div>
        </div>

        {/* 3. Period */}
        <div className="flex flex-col justify-center min-w-0">
            <div className="font-medium text-slate-700 dark:text-slate-300 text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={submission.period}>
                {formatDisplayPeriod(submission.period)}
            </div>
        </div>

        {/* 4. Balance */}
        <div className="flex flex-col justify-center min-w-0">
            <div className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{submission.endBalance}</div>
            <div className="text-xs text-slate-500 leading-tight mt-0.5">{submission.transactionCount} Buchungen</div>
        </div>

        {/* 5. Timestamp */}
        <div className="hidden lg:flex flex-col justify-center min-w-0">
            <div className="text-sm text-slate-600 dark:text-slate-400 truncate">{submission.receivedAt}</div>
        </div>

        {/* 6. Status & Actions */}
        <div className="flex items-center justify-end gap-3 min-w-0">
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 ${status.color}`}>
                {status.label}
            </div>
            
            <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors shrink-0" title="DATEV Export">
                <FileSpreadsheet size={16} />
            </button>
        </div>
    </div>
  );
};

export default SubmissionRow;