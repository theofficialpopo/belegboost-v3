import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, TeamRole } from '../types';
import { TEAM_MEMBERS } from './data';
import { useLocalStorage } from '../hooks';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedUser, setStoredUser] = useLocalStorage<User | null>('belegboost_user', null);
  const [state, setState] = useState<AuthState>({
    user: storedUser,
    isAuthenticated: !!storedUser,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate initial session check
    setState(prev => ({ ...prev, isLoading: false }));
  }, []);

  const login = async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock Login Logic - Find user in dummy data or create a default one
    const foundUser = TEAM_MEMBERS.find(m => m.email.toLowerCase() === email.toLowerCase());
    
    let user: User;
    if (foundUser) {
        user = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            avatar: foundUser.avatar
        };
    } else {
        // Fallback demo user
        user = {
            id: 'demo-user',
            name: 'Demo User',
            email: email,
            role: 'owner',
            avatar: 'DU'
        };
    }

    setStoredUser(user);
    setState({
      user,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    setStoredUser(null);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};