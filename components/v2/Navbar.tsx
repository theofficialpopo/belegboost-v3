import React from 'react';
import { FileText } from 'lucide-react';
import Button from '../ui/Button';
import ThemeSelector from '../ThemeSelector';

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl shadow-primary-900/10 px-6 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2 rounded-xl">
              <FileText size={20} className="fill-current" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">BelegBoost<span className="text-primary-500">.io</span></span>
        </div>

        {/* Links - Hidden on small mobile */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
          <a href="#" className="hover:text-primary-500 transition-colors">Product</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Pricing</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Company</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeSelector />
          <Button size="sm" className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105 transition-transform">
            Start Free
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;