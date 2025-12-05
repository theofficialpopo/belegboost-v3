import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  badge?: string;
}

const PageHeader = ({ title, description, children, badge }: PageHeaderProps) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-200/20 dark:bg-primary-500/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm mb-8 backdrop-blur-sm animate-in slide-in-from-bottom-4 fade-in duration-700">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-wide uppercase">
              {badge}
            </span>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
          {title}
        </h1>

        {description && (
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-3xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
            {description}
          </p>
        )}

        {children && (
          <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHeader;