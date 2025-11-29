import React from 'react';
import { RefreshCw, FileText, Globe, Shield, ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-slate-900 dark:text-white mb-6">
            Fintech meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">German Accounting</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            BelegBoost normalisiert Daten aus hunderten Quellen, konvertiert Fremdwährungen zum Tageskurs und formatiert alles für den reibungslosen DATEV-Import.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1: The Converter (Large) */}
            <div className="md:col-span-2 bg-slate-50 dark:bg-slate-950 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 overflow-hidden relative group transition-all hover:border-primary-200 dark:hover:border-slate-700">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                        <RefreshCw size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Automatische Währungsumrechnung</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md">
                        Wir rufen automatisch den offiziellen EZB-Referenzkurs für jeden Transaktionstag ab. USD, GBP, JPY werden korrekt in EUR umgerechnet.
                    </p>
                </div>
                
                {/* Visual Representation */}
                <div className="absolute right-0 bottom-8 translate-x-1/4 md:translate-x-0 md:right-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-4 w-64 opacity-90 group-hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-center text-xs mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400">Original (Amex)</span>
                        <span className="text-slate-400">DATEV</span>
                    </div>
                    <div className="flex justify-between items-center font-mono text-sm">
                        <span className="text-red-500">- $ 149.00</span>
                        <ArrowRight size={12} className="text-slate-300" />
                        <span className="text-slate-900 dark:text-white font-bold">- 136,42 €</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 text-right">Kurs: 0.9156 (EZB)</div>
                </div>
            </div>

            {/* Feature 2: DATEV Formatting (Tall) */}
            <div className="md:col-span-1 md:row-span-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] p-8 overflow-hidden relative group">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl flex items-center justify-center mb-6">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">DATEV Format</h3>
                    <p className="text-slate-300 dark:text-slate-600 mb-8">
                        Vollständig kompatibel mit DATEV Unternehmen online und Kanzlei-Rechnungswesen.
                    </p>
                </div>
                {/* Abstract Visual */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-primary-900/50 to-transparent dark:from-slate-200/50 pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6 space-y-2 font-mono text-xs opacity-60">
                    <div className="bg-white/10 dark:bg-black/5 p-2 rounded border border-white/10 dark:border-black/10 truncate">
                        "Umsatz";"Soll";"Haben"
                    </div>
                    <div className="bg-white/10 dark:bg-black/5 p-2 rounded border border-white/10 dark:border-black/10 truncate">
                        "129,00";"4930";"1200"
                    </div>
                    <div className="bg-white/10 dark:bg-black/5 p-2 rounded border border-white/10 dark:border-black/10 truncate">
                        "39,42";"4670";"1200"
                    </div>
                </div>
            </div>

            {/* Feature 3: Smart Mapping (Small) */}
            <div className="md:col-span-1 bg-white dark:bg-slate-950 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors group">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4">
                    <Globe size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Multi-Source Sync</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Verbinden Sie beliebig viele Wise, Revolut, Qonto und Holvi Konten.
                </p>
            </div>

             {/* Feature 4: Security (Small) */}
             <div className="md:col-span-1 bg-white dark:bg-slate-950 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors group">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                    <Shield size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Bank-Level Security</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    AES-256 Verschlüsselung und Serverstandort Frankfurt (ISO 27001).
                </p>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Features;