'use client';

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

export type ColorTheme = 'emerald' | 'ocean' | 'violet';

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('emerald');

  useEffect(() => {
    const stored = localStorage.getItem('belegboost-color-theme') as ColorTheme;
    if (stored && ['emerald', 'ocean', 'violet'].includes(stored)) {
      setColorThemeState(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem('belegboost-color-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const value = useMemo(() => ({
    colorTheme,
    setColorTheme
  }), [colorTheme]);

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export const useColorTheme = (): ColorThemeContextType => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within ColorThemeProvider');
  }
  return context;
};
