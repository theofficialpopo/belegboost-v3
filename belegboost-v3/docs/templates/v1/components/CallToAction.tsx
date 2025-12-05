import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';

interface CallToActionProps {
  onNavigate?: (page: 'landing' | 'signin' | 'signup') => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-50 dark:bg-slate-900 rounded-3xl p-12 md:p-16 text-center border border-primary-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors duration-300">
          
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/40 dark:bg-primary-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/40 dark:bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-slate-900 dark:text-white mb-6">
              Bereit, Ihren Workflow zu optimieren?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Schließen Sie sich hunderten Steuerberatern an, die jede Woche Stunden mit BelegBoost sparen.
            </p>
            <Button 
              size="lg" 
              className="shadow-xl shadow-primary-500/20 dark:shadow-primary-900/40"
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