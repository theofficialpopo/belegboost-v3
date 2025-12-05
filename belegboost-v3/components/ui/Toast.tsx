'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import type { ToastMessage } from '../../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
};

const Toast: React.FC<{ message: ToastMessage; onDismiss: () => void }> = ({ message, onDismiss }) => {
  const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />,
    warning: <AlertTriangle size={20} className="text-amber-500" />
  };

  const borders = {
    success: 'border-l-4 border-l-green-500',
    error: 'border-l-4 border-l-red-500',
    info: 'border-l-4 border-l-blue-500',
    warning: 'border-l-4 border-l-amber-500'
  };

  return (
    <div className={`pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-lg p-4 min-w-[320px] max-w-md animate-in slide-in-from-bottom-2 fade-in duration-300 flex items-start gap-3 ${borders[message.type]}`}>
      <div className="shrink-0 mt-0.5">{icons[message.type]}</div>
      <div className="flex-grow">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{message.title}</h4>
        {message.message && (
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{message.message}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ToastContainer;
