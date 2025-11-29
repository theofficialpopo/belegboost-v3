import React from 'react';
import { UploadCloud, Zap, ShieldCheck, Database, LayoutGrid } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-6">Alles drin. <span className="text-slate-400 dark:text-slate-600">Und mehr.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Main Feature - Large */}
            <div className="md:col-span-2 md:row-span-2 bg-slate-100 dark:bg-slate-900 rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-6 shadow-sm">
                        <UploadCloud size={24} className="text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Smart Upload</h3>
                    <p className="text-slate-500 dark:text-slate-400">Intelligente Erkennung sortiert Belege automatisch.</p>
                </div>
                <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-primary-200/50 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
            </div>

            {/* Feature 2 - Wide */}
            <div className="md:col-span-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-[32px] p-8 flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10 max-w-xs">
                    <h3 className="text-2xl font-bold mb-2">DATEV Sync</h3>
                    <p className="text-slate-400 dark:text-slate-500">Direkter Export. Ein Klick.</p>
                </div>
                <Database size={48} className="text-primary-500 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-900/20 pointer-events-none"></div>
            </div>

            {/* Feature 3 - Small */}
            <div className="bg-primary-500 text-white rounded-[32px] p-8 flex flex-col justify-center relative overflow-hidden group">
                <ShieldCheck size={32} className="mb-4" />
                <h3 className="text-xl font-bold">DSGVO Sicher</h3>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            {/* Feature 4 - Small */}
            <div className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[32px] p-8 flex flex-col justify-center">
                <Zap size={32} className="mb-4 text-amber-500" />
                <h3 className="text-xl font-bold">Blitzschnell</h3>
            </div>
        </div>
    </section>
  );
};

export default Features;