'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Menu } from 'lucide-react';
import Button from '../ui/Button';
import ThemeSelector from '../ui/ThemeSelector';

const Navbar = () => {
  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl shadow-slate-200/50 dark:shadow-black/50 px-6 py-3 flex items-center justify-between transition-all duration-300">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2 rounded-xl">
            <FileText size={20} className="fill-current" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block text-slate-900 dark:text-white">
            BelegBoost<span className="text-primary-500">.io</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
          <a href="/features" className="hover:text-primary-500 transition-colors">Integrationen</a>
          <a href="/preise" className="hover:text-primary-500 transition-colors">Preise</a>
          <a href="/ueber-uns" className="hover:text-primary-500 transition-colors">Über uns</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeSelector />
          <Link
            href="/login"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs font-medium transition-all bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
          >
            Login
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105 transition-transform shadow-lg"
            >
              Registrieren
            </Button>
          </Link>
          <button className="md:hidden text-slate-600 dark:text-slate-300">
            <Menu size={24} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
