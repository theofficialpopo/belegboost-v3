'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useColorTheme } from '../../lib/ColorThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';

interface ThemeSelectorProps {
  className?: string;
}

const ThemeSelector = ({ className = '' }: ThemeSelectorProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme: mode, setTheme: setMode } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Skeleton during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`flex flex-col md:flex-row items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-[20px] md:rounded-full border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm ${className}`}>
        <div className="flex bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm">
          <div className="p-1.5 w-7 h-7" />
          <div className="p-1.5 w-7 h-7" />
          <div className="p-1.5 w-7 h-7" />
        </div>
        <div className="hidden md:block w-px h-4 bg-slate-300 dark:bg-slate-700" />
        <div className="flex gap-1 pr-1">
          <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-[20px] md:rounded-full border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm ${className}`}>
      {/* Mode Switcher */}
      <div className="flex bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm">
        <button
          onClick={() => setMode('light')}
          className={`p-1.5 rounded-full transition-all ${mode === 'light' ? 'bg-slate-100 text-amber-500 dark:bg-slate-800' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          title="Light Mode"
        >
          <Sun size={14} />
        </button>
        <button
          onClick={() => setMode('system')}
          className={`p-1.5 rounded-full transition-all ${mode === 'system' ? 'bg-slate-100 text-primary-500 dark:bg-slate-800' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          title="System Mode"
        >
          <Monitor size={14} />
        </button>
        <button
          onClick={() => setMode('dark')}
          className={`p-1.5 rounded-full transition-all ${mode === 'dark' ? 'bg-slate-100 text-indigo-400 dark:bg-slate-800' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          title="Dark Mode"
        >
          <Moon size={14} />
        </button>
      </div>

      <div className="hidden md:block w-px h-4 bg-slate-300 dark:bg-slate-700" />

      {/* Color Switcher */}
      <div className="flex gap-1 pr-1">
        <button
          onClick={() => setColorTheme('emerald')}
          className={`w-4 h-4 rounded-full bg-emerald-500 ring-offset-1 dark:ring-offset-slate-900 transition-all ${colorTheme === 'emerald' ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
          title="Emerald Theme"
        />
        <button
          onClick={() => setColorTheme('ocean')}
          className={`w-4 h-4 rounded-full bg-blue-500 ring-offset-1 dark:ring-offset-slate-900 transition-all ${colorTheme === 'ocean' ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
          title="Ocean Theme"
        />
        <button
          onClick={() => setColorTheme('violet')}
          className={`w-4 h-4 rounded-full bg-violet-500 ring-offset-1 dark:ring-offset-slate-900 transition-all ${colorTheme === 'violet' ? 'ring-2 ring-violet-500 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
          title="Violet Theme"
        />
      </div>
    </div>
  );
};

export default ThemeSelector;
