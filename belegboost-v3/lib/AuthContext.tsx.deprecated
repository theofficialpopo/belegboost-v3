'use client';

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
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
const DemoAuthContextProvider = ({ children }: { children: React.ReactNode }) => {
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

// Production mode provider (uses NextAuth session - requires SessionProvider ancestor)
// This is a thin wrapper that delegates all auth operations to NextAuth
const ProductionAuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Delegate to NextAuth for session state
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!session?.user;

  // Map NextAuth session to our app's User type
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
    // Delegate to NextAuth signIn (single source of truth)
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
    // Delegate to NextAuth signOut (single source of truth)
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

// Public AuthProvider - thin wrapper around NextAuth
// Production mode: Delegates to NextAuth (assumes SessionProvider is an ancestor in layout)
// Demo mode: Provides mock authentication state for development
export const AuthProvider = ({ children, mode = 'production' }: {
  children: React.ReactNode;
  mode?: 'demo' | 'production';
}) => {
  // Demo mode: use mock data (no NextAuth)
  if (mode === 'demo') {
    return <DemoAuthContextProvider>{children}</DemoAuthContextProvider>;
  }

  // Production mode: delegate to NextAuth (SessionProvider must be an ancestor)
  return <ProductionAuthContextProvider>{children}</ProductionAuthContextProvider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
