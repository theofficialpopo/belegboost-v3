import React from 'react';
import { RefreshCw, FileText, Check, Download } from 'lucide-react';

const HeroMockup = () => {
  return (
    <div className="relative animate-in slide-in-from-right-8 fade-in duration-1000 delay-300 perspective-1000">
      {/* Main Card */}
      <div className="relative z-20 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 p-6 overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">

        {/* Header Mockup */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              AMEX
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                American Express Platinum
              </div>
              <div className="text-xs text-slate-500">Letzter Sync: Gerade eben</div>
            </div>
          </div>
          <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full flex items-center gap-1">
            <RefreshCw size={12} className="animate-spin-slow" /> Verbunden
          </div>
        </div>

        {/* Transaction List Mockup */}
        <div className="space-y-3">
          {/* Item 1 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-default">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-600">
                <FileText size={14} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Uber Technologies Inc.
                </div>
                <div className="text-xs text-slate-500">San Francisco • USD 42.50</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 dark:text-white">39,42 €</div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-default">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-600">
                <FileText size={14} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Google Cloud EMEA
                </div>
                <div className="text-xs text-slate-500">Dublin • EUR 129.00</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 dark:text-white">129,00 €</div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-default opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-600">
                <FileText size={14} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Slack Technologies
                </div>
                <div className="text-xs text-slate-500">San Francisco • USD 12.00</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 dark:text-white">11,15 €</div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button className="bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-colors flex items-center gap-2">
            <Download size={14} />
            DATEV CSV Exportieren
          </button>
        </div>

        {/* Notification Toast */}
        <div className="absolute top-4 right-4 z-30 animate-in slide-in-from-top-2 fade-in duration-500">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 dark:border-slate-200">
            <div className="bg-green-500 text-white p-1 rounded-full">
              <Check size={12} strokeWidth={3} />
            </div>
            <div>
              <div className="text-xs font-bold leading-none mb-1">Export bereit</div>
              <div className="text-[10px] opacity-80 font-mono">EXTF_2025_03.csv</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
