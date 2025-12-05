import React from 'react';
import { formatCurrencyDE } from '../../../lib/utils';

interface CalculationSummaryProps {
  calculatedStartBalance: number;
  mockIncoming: number;
  mockOutgoing: number;
  endBalanceNum: number;
}

const CalculationSummary: React.FC<CalculationSummaryProps> = ({
  calculatedStartBalance,
  mockIncoming,
  mockOutgoing,
  endBalanceNum,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="grid grid-cols-[24px_1fr_max-content] gap-x-2 gap-y-3 text-sm items-center">
        {/* Row 1: Calculated Start */}
        <div className="w-6"></div> {/* No Operator */}
        <div className="text-slate-500 flex items-center gap-2 flex-wrap">
          Anfangsbestand
          <span className="text-[9px] uppercase tracking-wider font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded whitespace-nowrap inline-block">
            Berechnet
          </span>
        </div>
        <div className="font-mono text-slate-500 text-right whitespace-nowrap tabular-nums">
          {formatCurrencyDE(calculatedStartBalance)}
        </div>

        {/* Row 2: Incoming */}
        <div className="text-green-500 font-mono font-bold text-lg text-center">+</div>
        <div className="text-green-600 dark:text-green-400">Einnahmen</div>
        <div className="font-mono font-medium text-green-600 dark:text-green-400 text-right whitespace-nowrap tabular-nums">
          {formatCurrencyDE(mockIncoming)}
        </div>

        {/* Row 3: Outgoing */}
        <div className="text-red-500 font-mono font-bold text-lg text-center">−</div>
        <div className="text-red-500 dark:text-red-400">Ausgaben</div>
        <div className="font-mono font-medium text-red-500 dark:text-red-400 text-right whitespace-nowrap tabular-nums">
          {formatCurrencyDE(mockOutgoing)}
        </div>

        {/* Separator Line */}
        <div className="col-span-3 h-px bg-slate-300 dark:bg-slate-600 my-1"></div>

        {/* Row 4: End Result */}
        <div className="text-slate-900 dark:text-white font-bold text-lg text-center">=</div>
        <div className="text-slate-900 dark:text-white font-bold text-base">Endsaldo</div>
        <div className="font-mono text-slate-900 dark:text-white font-bold text-lg text-right whitespace-nowrap tabular-nums">
          {formatCurrencyDE(endBalanceNum)}
        </div>
      </div>
    </div>
  );
};

export default CalculationSummary;