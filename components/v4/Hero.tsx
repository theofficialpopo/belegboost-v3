import React from 'react';
import { ArrowRight, Check, CreditCard, RefreshCw, FileText } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-200/20 dark:bg-primary-500/10 blur-[100px]" />
          <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm mb-8 backdrop-blur-sm">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-wide uppercase">Neu: Amex High-Volume Sync</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                  Auslands-Konten & <br /> Kreditkarten endlich in <span className="text-primary-600 dark:text-primary-400">DATEV</span>.
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Konvertieren Sie Abrechnungen von American Express, Wise, Revolut und ausländischen Banken automatisch in das perfekte DATEV-Format. Keine Excel-Hölle mehr.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                  <Button size="lg" className="rounded-full shadow-lg shadow-primary-500/20 px-8">
                    Kostenlos starten
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                    Demo ansehen
                  </Button>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2"><Check size={16} className="text-primary-500" /> DSGVO-konform</div>
                    <div className="flex items-center gap-2"><Check size={16} className="text-primary-500" /> Kanzlei-Freigabe</div>
                </div>
            </div>

            {/* Right UI Mockup */}
            <div className="relative">
                {/* Main Card */}
                <div className="relative z-20 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 p-6 overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
                    
                    {/* Header Mockup */}
                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">AMEX</div>
                            <div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">American Express Platinum</div>
                                <div className="text-xs text-slate-500">Letzter Sync: Gerade eben</div>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full flex items-center gap-1">
                            <RefreshCw size={12} className="animate-spin-slow" /> Active
                        </div>
                    </div>

                    {/* Transaction List Mockup */}
                    <div className="space-y-3">
                         {/* Item 1 */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-default">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-600">
                                    <FileText size={14} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Uber Technologies Inc.</div>
                                    <div className="text-xs text-slate-500">San Francisco • USD 42.50</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-900 dark:text-white">39,42 €</div>
                                <div className="text-[10px] font-mono text-primary-600 dark:text-primary-400">#4900 Sonst. Aufwand</div>
                            </div>
                        </div>

                         {/* Item 2 */}
                         <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-default">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-600">
                                    <FileText size={14} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Google Cloud EMEA</div>
                                    <div className="text-xs text-slate-500">Dublin • EUR 129.00</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-900 dark:text-white">129,00 €</div>
                                <div className="text-[10px] font-mono text-primary-600 dark:text-primary-400">#4930 Bürobedarf</div>
                            </div>
                        </div>

                         {/* Item 3 */}
                         <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-default opacity-60">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-600">
                                    <FileText size={14} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Slack Technologies</div>
                                    <div className="text-xs text-slate-500">San Francisco • USD 12.00</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-900 dark:text-white">11,15 €</div>
                                <div className="text-[10px] font-mono text-slate-400">Automatische Zuordnung...</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                        <button className="bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-colors flex items-center gap-2">
                             DATEV Export generieren
                        </button>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-6 top-20 z-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 animate-slide-up animation-delay-1000 hidden md:block">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                            <Check size={16} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">Export erfolgreich</div>
                            <div className="text-[10px] text-slate-500">EXTF_2023_10.csv</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;