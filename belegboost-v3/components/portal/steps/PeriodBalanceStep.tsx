'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar, Wallet } from 'lucide-react';
import { PortalFormData } from '../../../types';
import MonthRangePicker from '../ui/MonthRangePicker';
import { getSafeDateStrings, formatCurrencyDE, parseCurrencyInput, formatDateDE } from '../../../lib/utils';
import StepHeader from '../ui/StepHeader';

interface PeriodBalanceStepProps {
  data: PortalFormData;
  updateData: (data: Partial<PortalFormData>) => void;
  onNext: () => void;
}

type PresetType = 'lastMonth' | 'prevLastMonth' | 'lastQuarter' | 'year';

const PRESET_BUTTONS: { label: string; value: PresetType }[] = [
  { label: 'Letzter Monat', value: 'lastMonth' },
  { label: 'Vorletzter Monat', value: 'prevLastMonth' },
  { label: 'Letztes Q.', value: 'lastQuarter' },
  { label: 'Letztes Jahr', value: 'year' },
];

const PeriodBalanceStep: React.FC<PeriodBalanceStepProps> = ({ data, updateData }) => {
  const [mode, setMode] = useState<'month' | 'range'>('month');
  const [detected, setDetected] = useState(false);
  const [balanceInputFocused, setBalanceInputFocused] = useState(false);

  useEffect(() => {
    if (data.dataFile && !data.startDate && !detected) {
      const timer = setTimeout(() => {
        setDetected(true);
        const now = new Date();
        const { start, end } = getSafeDateStrings(now.getFullYear(), now.getMonth());
        updateData({ startDate: start, endDate: end });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data.dataFile, data.startDate, detected, updateData]);

  const handleBalanceFocus = useCallback(() => {
    setBalanceInputFocused(true);
    if (data.endBalance) {
      updateData({ endBalance: parseCurrencyInput(data.endBalance) });
    }
  }, [data.endBalance, updateData]);

  const handleBalanceBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setBalanceInputFocused(false);
    const formatted = formatCurrencyDE(e.target.value);
    updateData({ endBalance: formatted });
  }, [updateData]);

  const handleDateChange = useCallback((start: string, end: string) => {
    updateData({ startDate: start, endDate: end });
  }, [updateData]);

  const setPreset = useCallback((type: PresetType) => {
    const anchor = new Date();
    let start = '', end = '';

    if (type === 'lastMonth') {
      let y = anchor.getFullYear();
      let m = anchor.getMonth() - 1;
      if (m < 0) { m = 11; y--; }
      const res = getSafeDateStrings(y, m);
      start = res.start; end = res.end;
      setMode('month');
    } else if (type === 'prevLastMonth') {
      let y = anchor.getFullYear();
      let m = anchor.getMonth() - 2;
      if (m < 0) { m += 12; y--; }
      const res = getSafeDateStrings(y, m);
      start = res.start; end = res.end;
      setMode('month');
    } else if (type === 'lastQuarter') {
      const currentQ = Math.floor(anchor.getMonth() / 3);
      let q = currentQ - 1;
      let y = anchor.getFullYear();
      if (q < 0) { q = 3; y--; }

      const startM = q * 3;
      const endM = startM + 2;
      start = getSafeDateStrings(y, startM).start;
      end = getSafeDateStrings(y, endM).end;
      setMode('range');
    } else if (type === 'year') {
      const y = anchor.getFullYear() - 1;
      start = `${y}-01-01`;
      end = `${y}-12-31`;
      setMode('range');
    }
    updateData({ startDate: start, endDate: end });
  }, [updateData]);

  const handleModeSwitch = useCallback((newMode: 'month' | 'range') => {
    setMode(newMode);
    updateData({ startDate: '', endDate: '' });
  }, [updateData]);

  const formattedEndDate = useMemo(
    () => formatDateDE(data.endDate) || 'Enddatum',
    [data.endDate]
  );

  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300">
        <StepHeader
            title="Zeitraum & Saldo"
            description="Definieren Sie den Zeitraum und den Endsaldo zur Abstimmung."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Period Selection */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Calendar size={18} className="text-primary-500"/>
                        Buchungszeitraum
                    </label>
                    <div className="flex items-center gap-2 text-xs">
                        <button
                            onClick={() => handleModeSwitch('month')}
                            className={`px-3 py-1 rounded-full transition-colors ${mode === 'month' ? 'bg-primary-100 text-primary-700 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}
                        >
                            Monat
                        </button>
                        <button
                            onClick={() => handleModeSwitch('range')}
                            className={`px-3 py-1 rounded-full transition-colors ${mode === 'range' ? 'bg-primary-100 text-primary-700 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}
                        >
                            Zeitraum
                        </button>
                    </div>
                </div>

                {/* Quick Buttons */}
                <div className="flex flex-wrap gap-2">
                    {PRESET_BUTTONS.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setPreset(btn.value)}
                            className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-transparent hover:border-slate-300"
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                <MonthRangePicker
                    startDate={data.startDate}
                    endDate={data.endDate}
                    isRange={mode === 'range'}
                    onChange={handleDateChange}
                />

                {mode === 'range' && data.startDate && data.endDate && (
                    <div className="text-xs text-center text-slate-500 font-mono">
                        {formatDateDE(data.startDate)} - {formatDateDE(data.endDate)}
                    </div>
                )}
            </div>

            {/* Balance Input */}
            <div className="flex flex-col">
                 <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                    <Wallet size={18} className="text-primary-500" />
                    Endsaldo laut Auszug <span className="text-red-500">*</span>
                 </label>

                 <div className="flex-grow flex flex-col justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-primary-400 transition-colors">
                    <div className="text-center mb-4 text-sm text-slate-500">
                        Bitte geben Sie den Endsaldo des Kontoauszugs zum <strong className="text-slate-900 dark:text-white">{formattedEndDate}</strong> ein.
                    </div>
                    <div className="relative max-w-[240px] mx-auto w-full">
                        <input
                            type="text"
                            value={data.endBalance}
                            onFocus={handleBalanceFocus}
                            onBlur={handleBalanceBlur}
                            onChange={(e) => updateData({ endBalance: e.target.value })}
                            className={`w-full text-center py-4 rounded-xl bg-white dark:bg-slate-900 border-2 focus:ring-4 focus:ring-primary-500/20 outline-none text-3xl font-bold transition-all placeholder:text-slate-300 ${
                                !data.endBalance && !balanceInputFocused
                                ? 'border-primary-300 dark:border-primary-700'
                                : 'border-green-500 dark:border-green-600 text-green-600 dark:text-green-400'
                            }`}
                            placeholder="0,00"
                        />
                    </div>
                     {!data.endBalance && !balanceInputFocused && (
                        <div className="text-center mt-3 text-xs text-red-500 font-medium animate-pulse">
                            * Eingabe erforderlich
                        </div>
                    )}
                 </div>
            </div>
        </div>
    </div>
  );
};

export default PeriodBalanceStep;
