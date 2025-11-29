
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
