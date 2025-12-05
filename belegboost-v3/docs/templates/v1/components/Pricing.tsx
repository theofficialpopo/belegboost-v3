import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Button from './ui/Button';
import { PricingTier } from '../types';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers: PricingTier[] = [
    {
      name: "Starter",
      price: 9.99,
      description: "Perfekt für Einzelberater, die gerade starten.",
      features: ["Bis zu 250 Buchungen / Monat", "1 Teammitglied", "Basis DATEV-Export"],
      buttonText: "Jetzt starten",
      buttonVariant: "outline"
    },
    {
      name: "Professional",
      price: 29.99,
      description: "Für wachsende Kanzleien mit mehr Anforderungen.",
      features: ["Bis zu 2.500 Buchungen / Monat", "5 Teammitglieder", "Erweiterte DATEV-Integration"],
      isPopular: true,
      buttonText: "Kostenlos testen",
      buttonVariant: "primary"
    },
    {
      name: "Business",
      price: 89.99,
      description: "Für große Kanzleien mit hohem Volumen.",
      features: ["Bis zu 25.000 Buchungen / Monat", "Unbegrenzte Teammitglieder", "Dedizierter Account Manager"],
      buttonText: "Vertrieb kontaktieren",
      buttonVariant: "outline"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-slate-900 dark:text-white mb-4">
            Einfache, transparente Preise
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Starten Sie kostenlos, upgraden Sie wenn Sie mehr brauchen.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Monatlich</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full p-1 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-950"
            >
              <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isAnnual ? 'bg-primary-600' : 'bg-slate-400 opacity-0'}`}></div>
               <div 
                className={`relative z-10 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} 
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Jährlich</span>
            <span className="inline-block px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold">20% sparen</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                tier.isPopular 
                  ? 'bg-white dark:bg-slate-900 border-2 border-primary-500 dark:border-primary-500 shadow-xl shadow-primary-500/10 dark:shadow-primary-900/20 scale-105 z-10' 
                  : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-900/50'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                  Beliebteste Wahl
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white transition-colors">
                    {Math.floor(tier.price).toLocaleString('de-DE')},{((tier.price % 1) * 100).toFixed(0)}€
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">/ Monat</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 min-h-[40px]">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Check className="w-5 h-5 text-primary-600 dark:text-primary-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.buttonVariant as any} 
                fullWidth
                className={tier.isPopular ? 'shadow-lg shadow-primary-500/20 dark:shadow-primary-900/30' : ''}
              >
                {tier.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-slate-500 dark:text-slate-400 text-sm hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-center gap-1 mx-auto transition-colors">
            Alle Pläne ansehen <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;