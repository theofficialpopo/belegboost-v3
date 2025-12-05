'use client';

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { SessionProvider, useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
import type { User, TeamRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  organizationSlug: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo mode
const MOCK_USER: User = {
  id: 'demo-user-id',
  name: 'Demo Benutzer',
  email: 'demo@belegboost.de',
  role: 'admin',
  avatar: undefined,
};

const MOCK_ORGANIZATION_SLUG = 'demo';

// Demo mode provider (no NextAuth session)
const DemoAuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: AuthContextType = useMemo(() => ({
    user: MOCK_USER,
    isAuthenticated: true,
    isLoading: false,
    login: async () => ({}), // No-op in demo mode
    logout: async () => {}, // No-op in demo mode
    organizationSlug: MOCK_ORGANIZATION_SLUG,
  }), []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Production mode provider (uses Auth.js session)
const ProductionAuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!session?.user;

  // Map Auth.js session to our User type
  const user: User | null = useMemo(() => {
    if (!session?.user) return null;
    return {
      id: session.user.id,
      name: session.user.name || '',
      email: session.user.email || '',
      role: (session.user.role as TeamRole) || 'member',
      avatar: session.user.avatar,
    };
  }, [session]);

  const organizationSlug = session?.user?.organizationSlug || null;

  const login = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    const result = await nextAuthSignIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: 'Ungültige Anmeldedaten' };
    }

    return {};
  }, []);

  const logout = useCallback(async () => {
    await nextAuthSignOut({ redirect: false });
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    organizationSlug,
  }), [user, isAuthenticated, isLoading, login, logout, organizationSlug]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Public AuthProvider with mode flag
export const AuthProvider: React.FC<{
  children: React.ReactNode;
  mode?: 'demo' | 'production';
}> = ({ children, mode = 'production' }) => {
  // Demo mode: skip SessionProvider and use mock data
  if (mode === 'demo') {
    return <DemoAuthContextProvider>{children}</DemoAuthContextProvider>;
  }

  // Production mode: wrap with SessionProvider
  return (
    <SessionProvider>
      <ProductionAuthContextProvider>
        {children}
      </ProductionAuthContextProvider>
    </SessionProvider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
