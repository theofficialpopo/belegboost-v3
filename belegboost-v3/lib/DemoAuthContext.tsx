'use client';

import { createContext, useContext, ReactNode } from 'react';

// Mock user for demo mode
const mockUser = {
  id: 'demo-user-id',
  name: 'Demo Benutzer',
  email: 'demo@belegboost.de',
  role: 'admin' as const,
  organizationId: 'demo-org-id',
  organizationSlug: 'demo',
  avatar: undefined,
};

interface DemoAuthContextType {
  user: typeof mockUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const DemoAuthContext = createContext<DemoAuthContextType | null>(null);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const value: DemoAuthContextType = {
    user: mockUser,
    isAuthenticated: true,
    isLoading: false,
    login: async () => ({}), // No-op in demo mode
    logout: async () => {}, // No-op in demo mode
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
}
