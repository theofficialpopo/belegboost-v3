import { CheckCircle2, AlertCircle, Clock, FileSpreadsheet } from 'lucide-react';
import { Submission } from '../types';

export const formatDateDE = (isoDate: string) => {
  if (!isoDate) return '-';
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
};

export const formatCurrencyDE = (val: string | number) => {
    if (!val && val !== 0) return '';
    if (typeof val === 'string' && val.includes('€')) return val;

    let num: number;
    if (typeof val === 'number') {
        num = val;
    } else {
        let clean = val.replace(/[^0-9,.-]/g, '');
        if (clean.includes(',')) {
            clean = clean.replace(/\./g, '').replace(',', '.');
        } 
        num = parseFloat(clean);
    }

    if (isNaN(num)) return '';

    return new Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    }).format(num);
};

export const parseCurrencyInput = (val: string): string => {
    return val.replace(/[^0-9,]/g, '').replace('€', '').trim();
};

export const parseCurrencyToNumber = (val: string): number => {
    if (!val) return 0;
    let clean = val.replace(/[^0-9,.-]/g, '');
    if (clean.includes(',')) {
        clean = clean.replace(/\./g, '').replace(',', '.');
    }
    return parseFloat(clean) || 0;
};

export const getSafeDateStrings = (year: number, monthIndex: number) => {
    const mStr = (monthIndex + 1).toString().padStart(2, '0');
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const start = `${year}-${mStr}-01`;
    const end = `${year}-${mStr}-${daysInMonth}`;
    return { start, end };
};

export const formatDisplayPeriod = (periodStr: string) => {
    // Input formats expected: "01.09.2025 - 30.09.2025" or "Q3 2025" or "15.10.2025 - 20.10.2025"
    if (!periodStr.includes(' - ')) return periodStr;

    const [start, end] = periodStr.split(' - ');
    const parts1 = start.split('.');
    const parts2 = end.split('.');

    // Fallback if format is unexpected
    if (parts1.length !== 3 || parts2.length !== 3) return periodStr;

    const [d1, m1, y1] = parts1;
    const [d2, m2, y2] = parts2;

    // Logic: Compact Month.Year - Month.Year
    
    // Case 1: Same Month & Year (e.g. 01.09.2025 - 30.09.2025) -> "09.2025"
    if (m1 === m2 && y1 === y2) {
        return `${m1}.${y1}`;
    }
    
    // Case 2: Range across months, same year (e.g. 01.08.2025 - 30.09.2025) -> "08. - 09.2025"
    if (y1 === y2) {
       return `${m1}. - ${m2}.${y1}`;
    }

    // Case 3: Range across years -> "12.2024 - 01.2025"
    return `${m1}.${y1} - ${m2}.${y2}`;
};

export const getStatusConfig = (status: Submission['status']) => {
    switch (status) {
        case 'new': return { label: 'Neu', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: CheckCircle2 };
        case 'review': return { label: 'Prüfung', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: AlertCircle };
        case 'exported': return { label: 'Exportiert', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: FileSpreadsheet };
        default: return { label: 'Unbekannt', color: 'bg-slate-100 text-slate-700', icon: Clock };
    }
};
