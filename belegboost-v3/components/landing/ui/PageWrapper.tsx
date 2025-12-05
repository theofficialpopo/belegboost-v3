'use client';

import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30vw] h-[30vw] bg-emerald-100/20 dark:bg-emerald-900/10 rounded-full blur-[80px]" />
      </div>

      <Navbar />

      <main className="flex-grow relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageWrapper;
