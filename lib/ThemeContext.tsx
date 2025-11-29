import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from './hooks';

type Theme = 'emerald' | 'ocean' | 'violet';
type Mode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('belegboost-theme', 'emerald');
  const [mode, setMode] = useLocalStorage<Mode>('belegboost-mode', 'system');

  // Handle Color Theme
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-emerald', 'theme-ocean', 'theme-violet');
    if (theme !== 'emerald') {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Handle Light/Dark Mode
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyMode = () => {
      if (mode === 'dark' || (mode === 'system' && mediaQuery.matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyMode();

    if (mode === 'system') {
      mediaQuery.addEventListener('change', applyMode);
      return () => mediaQuery.removeEventListener('change', applyMode);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
