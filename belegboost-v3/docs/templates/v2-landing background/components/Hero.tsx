import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Dynamic Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        {/* Primary Color Blob */}
        <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
        
        {/* Secondary Blob (Cool Gray/Blue) */}
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-blue-100/40 dark:bg-slate-800/20 rounded-full blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
        
        {/* Accent Blob */}
        <div className="absolute -bottom-20 left-1/3 w-[300px] h-[300px] bg-emerald-100/40 dark:bg-primary-900/10 rounded-full blur-[80px] opacity-40 mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-semibold uppercase tracking-wide mb-8 animate-in fade-in zoom-in duration-500 hover:border-primary-200 dark:hover:border-primary-800 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="text-slate-600 dark:text-slate-300">DATEV Integration <span className="text-primary-600 dark:text-primary-400">v2.0</span> veröffentlicht</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl mx-auto text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
          Belegsammlung, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200">
            vereinfacht.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Schluss mit dem Hinterherlaufen von Belegen. Geben Sie Ihren Mandanten ein sicheres Portal zum Hochladen von Dokumenten und exportieren Sie perfekt formatierte DATEV-Dateien in Sekunden.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="group shadow-xl shadow-primary-500/20 dark:shadow-primary-900/30">
            Kostenlos starten
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            Anmelden
          </Button>
        </div>

        {/* Social Proof / Trusted By Text */}
        <div className="text-center">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
            Vertraut von modernen Steuerkanzleien
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 dark:hover:grayscale-0 dark:hover:opacity-100 transition-all duration-500">
            {['Kanzlei Weber', 'TAXFIX PRO', 'SteuerbüroXL', 'FinanzPartner'].map((partner) => (
              <span key={partner} className="text-xl font-bold text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 cursor-default transition-colors">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;