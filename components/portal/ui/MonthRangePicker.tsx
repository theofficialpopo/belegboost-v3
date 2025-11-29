
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getSafeDateStrings } from '../../../lib/utils';

interface MonthRangePickerProps {
    startDate: string;
    endDate: string;
    isRange: boolean;
    onChange: (start: string, end: string) => void;
}

const MonthRangePicker: React.FC<MonthRangePickerProps> = ({ 
    startDate, 
    endDate, 
    isRange, 
    onChange 
}) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectionStart, setSelectionStart] = useState<string | null>(null);

    // Initialize View Year based on data
    useEffect(() => {
        if (startDate) {
            setYear(parseInt(startDate.split('-')[0]));
        }
    }, []); // Run once on mount

    const months = [
        "Januar", "Februar", "März", "April", "Mai", "Juni", 
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    const handleMonthClick = (index: number) => {
        const { start, end } = getSafeDateStrings(year, index);

        if (!isRange) {
            // Single Mode
            onChange(start, end);
        } else {
            // Range Mode
            if (!selectionStart) {
                // First click: Set start
                setSelectionStart(start);
                // Temporarily set end to end of this month for visual feedback
                onChange(start, end);
            } else {
                // Second click: Set end
                // Determine order
                const d1 = new Date(selectionStart);
                const d2 = new Date(start);
                
                let finalStart, finalEnd;
                if (d1 > d2) {
                     finalStart = start;
                     finalEnd = getSafeDateStrings(new Date(selectionStart).getFullYear(), new Date(selectionStart).getMonth()).end;
                } else {
                     finalStart = selectionStart;
                     finalEnd = end;
                }
                onChange(finalStart, finalEnd);
                setSelectionStart(null); // Reset selection cycle
            }
        }
    };

    const isMonthSelected = (mIndex: number) => {
        if (!startDate || !endDate) return false;
        const mStart = `${year}-${(mIndex + 1).toString().padStart(2, '0')}-01`;
        
        const s = new Date(startDate);
        const e = new Date(endDate);
        const current = new Date(mStart);

        // Compare Year and Month
        const currentY = current.getFullYear();
        const currentM = current.getMonth();
        
        const startY = s.getFullYear();
        const startM = s.getMonth();
        
        const endY = e.getFullYear();
        const endM = e.getMonth();

        // Calculate absolute month indices for comparison
        const absCurrent = currentY * 12 + currentM;
        const absStart = startY * 12 + startM;
        const absEnd = endY * 12 + endM;

        return absCurrent >= absStart && absCurrent <= absEnd;
    };

    const getSelectionType = (mIndex: number) => {
        if (!startDate || !endDate) return 'none';
        
        const mStr = `${year}-${(mIndex + 1).toString().padStart(2, '0')}`;
        
        const isStart = startDate.startsWith(mStr);
        const isEnd = endDate.startsWith(mStr); // Check prefix YYYY-MM
        
        if (isStart && isEnd) return 'single';
        if (isStart) return 'start';
        if (isEnd) return 'end';
        if (isMonthSelected(mIndex)) return 'middle';
        return 'none';
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => setYear(year - 1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"><ChevronLeft size={20}/></button>
                <span className="font-bold text-slate-900 dark:text-white">{year}</span>
                <button onClick={() => setYear(year + 1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"><ChevronRight size={20}/></button>
            </div>
            <div className="grid grid-cols-3 gap-y-1 gap-x-0 items-center">
                {months.map((m, i) => {
                    const type = getSelectionType(i);
                    let baseClass = "text-sm transition-all relative z-10 font-medium flex items-center justify-center ";
                    let content = m;
                    
                    if (type === 'single') {
                        baseClass += "bg-primary-600 text-white rounded-lg shadow-md h-10 mx-1";
                    }
                    else if (type === 'start') {
                        baseClass += "bg-primary-600 text-white rounded-l-lg h-10 ml-1";
                    }
                    else if (type === 'end') {
                        baseClass += "bg-primary-600 text-white rounded-r-lg h-10 mr-1";
                    }
                    else if (type === 'middle') {
                        // Slimmer, centered vertically (h-8) to act as connector
                        baseClass += "bg-primary-100/60 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 h-8 mx-[-1px]";
                    }
                    else {
                        baseClass += "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg h-10 mx-1";
                    }

                    return (
                        <button 
                            key={m} 
                            onClick={() => handleMonthClick(i)}
                            className={baseClass}
                        >
                            {content}
                        </button>
                    )
                })}
            </div>
             {isRange && selectionStart && (
                <div className="mt-2 text-xs text-center text-primary-600 animate-pulse">
                    Start gewählt. Wählen Sie den End-Monat.
                </div>
            )}
        </div>
    );
};

export default MonthRangePicker;
