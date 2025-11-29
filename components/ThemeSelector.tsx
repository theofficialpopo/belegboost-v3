import React from 'react';
import { useTheme } from '../lib/ThemeContext';
import { Moon, Sun, Monitor, Palette, Layout, Sparkles, History, Grid, Rocket, ChevronDown } from 'lucide-react';

interface ThemeSelectorProps {
  className?: string;
  showVariantSwitcher?: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className = '', showVariantSwitcher = true }) => {
  const { theme, setTheme, mode, setMode, variant, setVariant } = useTheme();

  const getVariantIcon = (v: string) => {
    switch (v) {
      case 'v1': return <Layout size={14} />;
      case 'v2': return <Sparkles size={14} />;
      case 'v3': return <History size={14} />;
      case 'v4': return <Grid size={14} />;
      case 'v5': return <Rocket size={14} />;
      default: return <Layout size={14} />;
    }
  };

  return (
    <div className={`flex flex-col md:flex-row items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-[20px] md:rounded-full border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm ${className}`}>
      
      {/* Variant Dropdown - Optional */}
      {showVariantSwitcher && (
        <>
          <div className="relative">
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
              className="appearance-none bg-white dark:bg-slate-900 pl-9 pr-8 py-1.5 rounded-full text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-700 dark:text-slate-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent min-w-[120px]"
            >
              <option value="v1">V1 Classic</option>
              <option value="v2">V2 Creative</option>
              <option value="v3">V3 Retro</option>
              <option value="v4">V4 Hybrid</option>
              <option value="v5">V5 Ultimate</option>
            </select>
            
            {/* Dynamic Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary-600 dark:text-primary-400">
              {getVariantIcon(variant)}
            </div>

            {/* Custom Chevron */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown size={12} />
            </div>
          </div>

          <div className="hidden md:block w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
        </>
      )}

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

      <div className="hidden md:block w-px h-4 bg-slate-300 dark:bg-slate-700"></div>

      {/* Color Switcher */}
      <div className="flex gap-1 pr-1">
        <button
          onClick={() => setTheme('emerald')}
          className={`w-4 h-4 rounded-full bg-emerald-500 ring-offset-1 dark:ring-offset-slate-900 transition-all ${theme === 'emerald' ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
          title="Emerald Theme"
        />
        <button
          onClick={() => setTheme('ocean')}
          className={`w-4 h-4 rounded-full bg-blue-500 ring-offset-1 dark:ring-offset-slate-900 transition-all ${theme === 'ocean' ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
          title="Ocean Theme"
        />
        <button
          onClick={() => setTheme('violet')}
          className={`w-4 h-4 rounded-full bg-violet-500 ring-offset-1 dark:ring-offset-slate-900 transition-all ${theme === 'violet' ? 'ring-2 ring-violet-500 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
          title="Violet Theme"
        />
      </div>
    </div>
  );
};

export default ThemeSelector;