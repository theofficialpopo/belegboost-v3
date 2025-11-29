import React from 'react';
import { FileText, Menu } from 'lucide-react';
import Button from '../ui/Button';
import ThemeSelector from '../ThemeSelector';

interface NavbarProps {
  onNavigate: (page: 'landing' | 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl shadow-slate-200/50 dark:shadow-black/50 px-6 py-3 flex items-center justify-between transition-all duration-300">
        
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onNavigate('landing')}
        >
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2 rounded-xl">
              <FileText size={20} className="fill-current" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block text-slate-900 dark:text-white">BelegBoost<span className="text-primary-500">.io</span></span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
          <a href="#" className="hover:text-primary-500 transition-colors">Integrationen</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Preise</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Kanzleien</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeSelector />
          <Button 
            variant="ghost"
            size="sm" 
            className="hidden sm:inline-flex text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            onClick={() => onNavigate('signin')}
          >
            Login
          </Button>
          <Button 
            size="sm" 
            className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105 transition-transform shadow-lg"
            onClick={() => onNavigate('signup')}
          >
            Registrieren
          </Button>
          <button className="md:hidden text-slate-600 dark:text-slate-300">
             <Menu size={24} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;