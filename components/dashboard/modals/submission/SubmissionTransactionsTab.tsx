
import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface SubmissionTransactionsTabProps {
  transactionCount: number;
}

const SubmissionTransactionsTab: React.FC<SubmissionTransactionsTabProps> = ({ transactionCount }) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Mock Transactions Data
  const MOCK_TRANSACTIONS = [
    { id: 1, merchant: 'Uber Technologies Inc.', location: 'San Francisco, US', date: '28.09.2025', amountEUR: '39,42 €', amountOrig: 'USD 42.50' },
    { id: 2, merchant: 'Google Cloud EMEA', location: 'Dublin, IE', date: '27.09.2025', amountEUR: '129,00 €', amountOrig: 'EUR 129.00' },
    { id: 3, merchant: 'Slack Technologies', location: 'San Francisco, US', date: '25.09.2025', amountEUR: '11,15 €', amountOrig: 'USD 12.00' },
    { id: 4, merchant: 'Deutsche Bahn', location: 'Berlin, DE', date: '24.09.2025', amountEUR: '84,50 €', amountOrig: 'EUR 84.50' },
    { id: 5, merchant: 'JetBrains s.r.o.', location: 'Prague, CZ', date: '22.09.2025', amountEUR: '249,00 €', amountOrig: 'EUR 249.00' },
    { id: 6, merchant: 'Starbucks Coffee', location: 'Munich, DE', date: '20.09.2025', amountEUR: '4,50 €', amountOrig: 'EUR 4.50' },
    { id: 7, merchant: 'DigitalOcean', location: 'New York, US', date: '19.09.2025', amountEUR: '45,00 €', amountOrig: 'USD 48.00' },
    { id: 8, merchant: 'GitHub Inc.', location: 'San Francisco, US', date: '18.09.2025', amountEUR: '21,00 €', amountOrig: 'USD 22.50' },
  ];

  const displayedTransactions = showAllTransactions ? MOCK_TRANSACTIONS : MOCK_TRANSACTIONS.slice(0, 5);
  const remainingCount = transactionCount - displayedTransactions.length;

  return (
    <div className="space-y-3 animate-in slide-in-from-right-4 fade-in duration-300">
        <p className="text-xs text-slate-500 mb-4 px-1">
            Vorschau der Transaktionen. Währungsumrechnungen wurden bereits angewendet.
        </p>
        
        {displayedTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-default border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-600 shadow-sm">
                        <FileText size={16} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{tx.merchant}</div>
                        <div className="text-xs text-slate-500">{tx.location} • {tx.date}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{tx.amountEUR}</div>
                    <div className="text-[10px] text-slate-400 mb-0.5">{tx.amountOrig}</div>
                </div>
            </div>
        ))}
        
        {!showAllTransactions && remainingCount > 0 && (
            <div className="text-center pt-4 pb-2">
                <button 
                    onClick={() => setShowAllTransactions(true)}
                    className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20"
                >
                    + {remainingCount} weitere anzeigen
                </button>
            </div>
        )}

        {showAllTransactions && (
            <div className="text-center pt-4 pb-2">
                    <button 
                    onClick={() => setShowAllTransactions(false)}
                    className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                >
                    Weniger anzeigen
                </button>
            </div>
        )}
    </div>
  );
};

export default SubmissionTransactionsTab;
