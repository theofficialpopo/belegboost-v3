import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-48 pb-24 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-950/30 dark:to-transparent -z-10"></div>
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary-400/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-overlay animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-overlay animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold text-sm mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
            <Sparkles size={14} />
            <span>Digitalisierung neu gedacht</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9] animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-100">
          Belege? <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-400 to-indigo-500 animate-gradient">
            Einfach. Erledigt.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200">
            Die intelligenteste Plattform für Steuerberater. Drag. Drop. DATEV.
            Ohne Papierkram, ohne Kopfschmerzen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
          <Button size="lg" className="rounded-full px-10 py-4 text-lg shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all">
            Start Now
          </Button>
          <button className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold hover:text-primary-600 transition-colors">
            Live Demo ansehen <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;