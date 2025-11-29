import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'emerald' | 'ocean' | 'violet';
type Mode = 'light' | 'dark' | 'system';
type Variant = 'v1' | 'v2' | 'v3' | 'v4' | 'v5';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  variant: Variant;
  setVariant: (variant: Variant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('emerald');
  const [mode, setMode] = useState<Mode>('system');
  const [variant, setVariant] = useState<Variant>('v1');

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
      // For V3 (Retro), we might want to force a specific look, but let's allow dark mode for a "Matrix" feel
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

  // Handle Layout Variant Class (for global styles like scrollbars)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('variant-v1', 'variant-v2', 'variant-v3', 'variant-v4', 'variant-v5');
    root.classList.add(`variant-${variant}`);
  }, [variant]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, setMode, variant, setVariant }}>
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