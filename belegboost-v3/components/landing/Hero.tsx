'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Button from '../ui/Button';
import HeroMockup from './ui/HeroMockup';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-48 pb-20 lg:pt-56 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-200/20 dark:bg-primary-500/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm mb-8 backdrop-blur-sm animate-in slide-in-from-bottom-4 fade-in duration-700">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-wide uppercase">Neu: Wise & Revolut Integration</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
              Transaktionen <br /> endlich im perfekten <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">DATEV-Format</span>.
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
              Konvertieren Sie CSV-Exporte und API-Daten von American Express, Wise, Revolut und ausländischen Banken automatisch in kompatible Buchungsstapel.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="rounded-full shadow-lg shadow-primary-500/20 px-8 hover:-translate-y-1 transition-transform"
                >
                  Kostenlos starten
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                Formate ansehen
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-400">
              <div className="flex items-center gap-2"><Check size={16} className="text-primary-500" /> Kanzlei-Rechnungswesen</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-primary-500" /> Unternehmen online</div>
            </div>
          </div>

          {/* Right UI Mockup */}
          <HeroMockup />

        </div>
      </div>
    </section>
  );
};

export default Hero;
