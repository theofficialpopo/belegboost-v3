'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { User, TeamRole } from '../types';

interface DemoModeContextType {
  user: User;
  organizationSlug: string;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

// Mock user for demo mode
const MOCK_USER: User = {
  id: 'demo-user-id',
  name: 'Demo Benutzer',
  email: 'demo@belegboost.de',
  role: 'admin' as TeamRole,
  avatar: undefined,
};

const MOCK_ORGANIZATION_SLUG = 'demo';

/**
 * DemoModeProvider provides mock authentication state for demo mode
 * This is separate from NextAuth and only used when slug === 'demo'
 */
export const DemoModeProvider = ({ children }: { children: React.ReactNode }) => {
  const value: DemoModeContextType = useMemo(() => ({
    user: MOCK_USER,
    organizationSlug: MOCK_ORGANIZATION_SLUG,
  }), []);

  return (
    <DemoModeContext.Provider value={value}>
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoMode = (): DemoModeContextType => {
  const context = useContext(DemoModeContext);
  if (context === undefined) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
};
