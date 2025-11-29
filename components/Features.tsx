import React from 'react';
import { UploadCloud, FileText, ShieldCheck, Zap, Users, CheckCircle } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Drag & Drop Uploads",
    description: "Mandanten ziehen einfach ihre Dateien. Keine Schulung erforderlich.",
    icon: UploadCloud
  },
  {
    title: "DATEV-fertig",
    description: "Export in Buchungsstapel-Format mit einem Klick.",
    icon: FileText
  },
  {
    title: "DSGVO-konform",
    description: "Deutsche Server, automatische Datenlöschung nach 30 Tagen.",
    icon: ShieldCheck
  },
  {
    title: "Sofortige Synchronisierung",
    description: "Sehen Sie Uploads sofort in Ihrem Dashboard.",
    icon: Zap
  },
  {
    title: "Team-Verwaltung",
    description: "Weisen Sie Mandanten bestimmten Teammitgliedern zu.",
    icon: Users
  },
  {
    title: "Vorab-Validierung",
    description: "Dateien werden geprüft, bevor sie Ihren Posteingang erreichen.",
    icon: CheckCircle
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50 relative border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
      
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-100/30 dark:bg-primary-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-slate-900 dark:text-white mb-4">
            Alles was Sie brauchen
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Speziell für deutsche Steuerberater und deren Mandanten entwickelt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-slate-950 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary-900/5 dark:hover:shadow-primary-900/10 hover:-translate-y-1 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 w-12 h-12 bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 group-hover:text-white dark:group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                <feature.icon size={24} />
              </div>
              <h3 className="relative z-10 text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{feature.title}</h3>
              <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;