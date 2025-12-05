import { CheckCircle2, AlertCircle, Clock, FileSpreadsheet } from 'lucide-react';
import type { Submission } from '../types';

/**
 * Formats an ISO date string (YYYY-MM-DD) to German format (DD.MM.YYYY)
 * @param isoDate - Date string in ISO format
 * @returns German formatted date or '-' if invalid
 */
export const formatDateDE = (isoDate: string): string => {
  if (!isoDate) return '-';

  // Validate ISO date format (YYYY-MM-DD)
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(isoDate)) {
    return isoDate; // Return as-is if not ISO format
  }

  const [year, month, day] = isoDate.split('-');

  if (!year || !month || !day) {
    return '-';
  }

  return `${day}.${month}.${year}`;
};

/**
 * Formats a number or string to German currency format
 * @param val - Value to format (number or string)
 * @returns Formatted currency string
 */
export const formatCurrencyDE = (val: string | number): string => {
  if (!val && val !== 0) return '';

  // If already formatted with €, return as-is
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

export const getSafeDateStrings = (year: number, monthIndex: number): { start: string; end: string } => {
  const mStr = (monthIndex + 1).toString().padStart(2, '0');
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const start = `${year}-${mStr}-01`;
  const end = `${year}-${mStr}-${daysInMonth}`;
  return { start, end };
};

/**
 * Compacts a period string for display
 * @param periodStr - Period string in format "DD.MM.YYYY - DD.MM.YYYY"
 * @returns Compacted period string
 */
export const formatDisplayPeriod = (periodStr: string): string => {
  // If no range separator or already compact format (like "Q3 2025"), return as-is
  if (!periodStr.includes(' - ')) return periodStr;

  // Check if input has dots (German date format)
  if (!periodStr.includes('.')) return periodStr;

  const [start, end] = periodStr.split(' - ');
  if (!start || !end) return periodStr;

  const parts1 = start.split('.');
  const parts2 = end.split('.');

  if (parts1.length !== 3 || parts2.length !== 3) return periodStr;

  const [, m1, y1] = parts1;
  const [, m2, y2] = parts2;

  // Case 1: Same Month & Year -> "09.2025"
  if (m1 === m2 && y1 === y2) {
    return `${m1}.${y1}`;
  }

  // Case 2: Range across months, same year -> "08. - 09.2025"
  if (y1 === y2) {
    return `${m1}. - ${m2}.${y1}`;
  }

  // Case 3: Range across years -> "12.2024 - 01.2025"
  return `${m1}.${y1} - ${m2}.${y2}`;
};

export const getStatusConfig = (status: Submission['status']) => {
  switch (status) {
    case 'new':
      return {
        label: 'Neu',
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        icon: CheckCircle2
      };
    case 'review':
      return {
        label: 'Prüfung',
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        icon: AlertCircle
      };
    case 'exported':
      return {
        label: 'Exportiert',
        color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        icon: FileSpreadsheet
      };
    default:
      return {
        label: 'Unbekannt',
        color: 'bg-slate-100 text-slate-700',
        icon: Clock
      };
  }
};

/**
 * Generates a URL-safe slug from a company name
 * Handles German umlauts and special characters
 */
export const generateSlug = (companyName: string): string => {
  return companyName
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};
