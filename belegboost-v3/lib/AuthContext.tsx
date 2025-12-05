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

// Internal provider that uses Auth.js session
const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

// Public AuthProvider that wraps SessionProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
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
