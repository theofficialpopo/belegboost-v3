import React, { useState } from 'react';
import { User, Search, CheckCircle2, Calculator } from 'lucide-react';
import { PortalFormData } from '../../../types';
import { formatDateDE, parseCurrencyToNumber } from '../../../lib/utils';
import { ADVISORS } from '../../../lib/portal-data';
import CalculationSummary from '../ui/CalculationSummary';
import StepHeader from '../ui/StepHeader';

interface AdvisorFinalizeStepProps {
  data: PortalFormData;
  updateData: (data: Partial<PortalFormData>) => void;
  onFinish: () => void;
}

const AdvisorFinalizeStep: React.FC<AdvisorFinalizeStepProps> = ({ data, updateData, onFinish }) => {
  const [search, setSearch] = useState('');

  const filteredAdvisors = ADVISORS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  // Mock Financial Data for Summary
  const mockIncoming = 12450.20;
  const mockOutgoing = 8230.50;
  
  // Calculate Starting Balance
  const endBalanceNum = parseCurrencyToNumber(data.endBalance);
  const calculatedStartBalance = endBalanceNum - mockIncoming + mockOutgoing;

  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300 h-full flex flex-col">
       <StepHeader 
         title="Abschluss" 
         description="Wählen Sie Ihren Ansprechpartner und prüfen Sie die Daten." 
       />

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left: Advisor Search */}
          <div className="flex flex-col h-full min-h-[300px]">
             <div className="flex justify-between items-center mb-4">
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <User size={18} />
                    Ansprechpartner
                 </label>
                 <div className="relative w-40">
                     <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Suchen..."
                        className="w-full pl-8 pr-2 py-1 text-xs rounded bg-slate-100 dark:bg-slate-800 border-none focus:ring-1 focus:ring-primary-500"
                     />
                 </div>
             </div>
             
             <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {filteredAdvisors.map((advisor) => (
                    <button
                        key={advisor.name}
                        onClick={() => updateData({ selectedAdvisor: advisor.name })}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left group ${
                            data.selectedAdvisor === advisor.name 
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 ring-1 ring-primary-500' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary-400'
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                             data.selectedAdvisor === advisor.name ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}>
                            {advisor.initials}
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm">{advisor.name}</div>
                            <div className="text-xs text-slate-500">{advisor.role}</div>
                        </div>
                        {data.selectedAdvisor === advisor.name && <CheckCircle2 size={18} className="ml-auto text-primary-500" />}
                    </button>
                ))}
             </div>
          </div>

          {/* Right: Summary Card */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                      <Calculator size={18} className="text-slate-400"/>
                      Abstimmung
                  </h3>
                  
                  {/* Calculation Stack */}
                  <CalculationSummary 
                    calculatedStartBalance={calculatedStartBalance}
                    mockIncoming={mockIncoming}
                    mockOutgoing={mockOutgoing}
                    endBalanceNum={endBalanceNum}
                  />

                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                      <div>
                          <span className="text-slate-400 block mb-1">Zeitraum</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {data.startDate && data.endDate ? `${formatDateDE(data.startDate)} - ${formatDateDE(data.endDate)}` : '-'}
                          </span>
                      </div>
                      <div className="text-right">
                          <span className="text-slate-400 block mb-1">Quelle</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{data.provider || '-'}</span>
                      </div>
                  </div>
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-lg flex gap-2">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <span>Mit dem Absenden bestätigen Sie die Richtigkeit des Endsaldos.</span>
              </div>
          </div>
       </div>
    </div>
  );
};

export default AdvisorFinalizeStep;