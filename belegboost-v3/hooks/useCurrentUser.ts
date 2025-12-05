import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import type { User, TeamRole } from '../types';

/**
 * Hook to get the current user - works in both production and demo mode
 * In production: Uses NextAuth session
 * In demo mode: Uses mock data from DemoModeProvider
 */
export function useCurrentUser() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Check if we're in demo mode by checking the URL
  const isDemoMode = pathname.startsWith('/demo/');

  // In demo mode, return mock user
  const user = useMemo(() => {
    if (isDemoMode) {
      // Mock user for demo mode
      return {
        id: 'demo-user-id',
        name: 'Demo Benutzer',
        email: 'demo@belegboost.de',
        role: 'admin' as TeamRole,
        avatar: undefined,
      } as User;
    }

    // In production mode, map NextAuth session to User type
    if (!session?.user) return null;
    return {
      id: session.user.id,
      name: session.user.name || '',
      email: session.user.email || '',
      role: (session.user.role as TeamRole) || 'member',
      avatar: session.user.avatar,
    } as User;
  }, [session, isDemoMode]);

  const isLoading = !isDemoMode && status === 'loading';
  const isAuthenticated = isDemoMode || (status === 'authenticated' && !!session?.user);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
