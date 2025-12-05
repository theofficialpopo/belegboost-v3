'use client';

import React from 'react';
import ToastContainer from './Toast';
import { useToastData, useToastActions } from '../../lib/ToastContext';

/**
 * Global toast container that renders all active toasts.
 * Uses split context to avoid unnecessary re-renders in other components.
 */
const GlobalToasts = () => {
  const toasts = useToastData();
  const { removeToast } = useToastActions();

  return <ToastContainer toasts={toasts} onDismiss={removeToast} />;
};

export default GlobalToasts;
