'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backHref?: string;
  backLabel?: string;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  backHref = '/',
  backLabel = 'Zurück zur Startseite'
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">

      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-200/20 dark:bg-primary-500/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md p-4 relative z-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-3 rounded-xl shadow-lg shadow-primary-500/30">
              <FileText size={32} className="fill-current" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-sans tracking-tight">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 p-8">
          {children}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href={backHref}
            className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
