'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface PortalLayoutProps {
  children: React.ReactNode;
  advisorName?: string;
}

const PortalLayout = ({
  children,
  advisorName = "Kanzlei Dr. Weiss & Partner"
}: PortalLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">

      {/* Advisor Header (Simulated Subdomain Header) */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6 md:px-10 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Advisor Logo Placeholder */}
            <div className="w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg flex items-center justify-center font-serif font-bold text-xl">
              W
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{advisorName}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Mandanten-Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-900/30">
            <ShieldCheck size={14} />
            <span className="hidden sm:inline">Sichere Verbindung</span>
            <span className="sm:hidden">Sicher</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-start pt-8 pb-20 px-4">
        <div className="w-full max-w-3xl relative z-10">
           {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 dark:text-slate-600 text-xs">
        <p className="flex items-center justify-center gap-1">
          Powered by <span className="font-bold text-slate-500 dark:text-slate-500">BelegBoost</span>
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="/datenschutz" className="hover:underline">Datenschutz</a>
          <a href="/impressum" className="hover:underline">Impressum</a>
        </div>
      </footer>
    </div>
  );
};

export default PortalLayout;
