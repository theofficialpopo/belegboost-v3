'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ToastMessage } from '../types';
import { TOAST_DEFAULTS } from '../constants';

// Split contexts: actions (stable) vs data (changes frequently)
interface ToastActionsType {
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastActionsContext = createContext<ToastActionsType | undefined>(undefined);
const ToastDataContext = createContext<ToastMessage[]>([]);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toastData: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toastData, id };

    setToasts((prev) => [...prev, newToast]);

    const duration = toastData.duration ?? TOAST_DEFAULTS.DURATION;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Actions are stable - won't cause re-renders
  const actions = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  return (
    <ToastActionsContext.Provider value={actions}>
      <ToastDataContext.Provider value={toasts}>
        {children}
      </ToastDataContext.Provider>
    </ToastActionsContext.Provider>
  );
};

// Hook for components that only need to add/remove toasts (most components)
export const useToastActions = (): ToastActionsType => {
  const context = useContext(ToastActionsContext);
  if (context === undefined) {
    throw new Error('useToastActions must be used within a ToastProvider');
  }
  return context;
};

// Hook for components that need to read toast data (only Toast container)
export const useToastData = (): ToastMessage[] => {
  return useContext(ToastDataContext);
};

// Combined hook for backward compatibility
export const useToast = () => {
  const actions = useToastActions();
  const toasts = useToastData();
  return { ...actions, toasts };
};
