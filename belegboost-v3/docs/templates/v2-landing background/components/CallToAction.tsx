import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';

interface CallToActionProps {
  onNavigate?: (page: 'landing' | 'signin' | 'signup') => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-12 md:p-16 text-center border border-white/50 dark:border-white/10 shadow-2xl shadow-slate-200/20 dark:shadow-black/20 relative overflow-hidden group">
          
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/30 dark:bg-primary-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-300/30 dark:group-hover:bg-primary-500/20 transition-colors duration-700 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 dark:bg-blue-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-blue-300/30 dark:group-hover:bg-blue-600/20 transition-colors duration-700 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold font-sans text-slate-900 dark:text-white mb-6 tracking-tight">
              Bereit, Ihren Workflow zu optimieren?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
              Schließen Sie sich hunderten Steuerberatern an, die jede Woche Stunden mit BelegBoost sparen.
            </p>
            <Button 
              size="lg" 
              className="rounded-full shadow-xl shadow-primary-500/20 dark:shadow-primary-900/40 px-10 py-4 text-lg hover:scale-105 transition-transform"
              onClick={() => onNavigate?.('signup')}
            >
              Kostenlos starten
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;