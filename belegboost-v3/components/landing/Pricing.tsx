'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Button from '../ui/Button';
import type { PricingTier } from '../../types';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  // Base monthly prices
  const basePrices = {
    starter: 29,
    growth: 79,
    agency: 199
  };

  const calculatePrice = (base: number): number => {
    return isAnnual ? Math.floor(base * 0.8) : base;
  };

  // Memoize tiers to prevent recalculation on every render
  const tiers: PricingTier[] = useMemo(() => [
    {
      name: "Starter",
      price: calculatePrice(basePrices.starter),
      description: "Für Freelancer mit einem Fremdwährungskonto.",
      features: ["Bis zu 100 Transaktionen", "1 Bankverbindung (z.B. Wise)", "Täglicher Kursabruf", "Standard DATEV Export"],
      buttonText: "Kostenlos testen",
      buttonVariant: "outline"
    },
    {
      name: "Growth",
      price: calculatePrice(basePrices.growth),
      description: "Für wachsende E-Commerce Brands.",
      features: ["Bis zu 1.000 Transaktionen", "5 Bankverbindungen", "Automatische Kontierung", "Stapelverarbeitung", "Priority Support"],
      isPopular: true,
      buttonText: "Jetzt starten",
      buttonVariant: "primary"
    },
    {
      name: "Kanzlei",
      price: calculatePrice(basePrices.agency),
      description: "Für Steuerberater mit vielen Mandanten.",
      features: ["Unbegrenzte Transaktionen", "Unbegrenzte Mandanten", "White-Label Portal", "Kanzlei-Dashboard", "Dedizierter Onboarding-Manager"],
      buttonText: "Vertrieb kontaktieren",
      buttonVariant: "outline"
    }
  ], [isAnnual]);

  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-slate-900 dark:text-white mb-4">
            Preise, die skalieren
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Starten Sie mit einer 14-tägigen kostenlosen Testphase.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-1.5 rounded-full inline-flex border border-slate-200/50 dark:border-white/10 shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!isAnnual ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Monatlich
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${isAnnual ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Jährlich <span className="text-[10px] bg-green-500 text-white px-1.5 rounded-sm">-20%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col relative rounded-[2rem] p-8 transition-all duration-300 ${
                tier.isPopular
                  ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-2 ring-primary-500 dark:ring-primary-500 shadow-2xl shadow-primary-500/20 dark:shadow-primary-900/40 z-10 scale-105'
                  : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-white/5 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-[1.5rem] uppercase tracking-wider">
                  Bestseller
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-300 min-h-[40px] mb-6">{tier.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {tier.price}€
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">/ Monat</span>
                </div>
                {isAnnual && (
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                    Jährliche Abrechnung (spart 20%)
                  </div>
                )}
              </div>

              <div className="h-px bg-slate-200/50 dark:bg-white/10 mb-8" />

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.isPopular ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400' : 'bg-white/50 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button
                  variant={tier.buttonVariant}
                  fullWidth
                  className={`rounded-xl py-3 ${tier.isPopular ? 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/20' : 'bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border-transparent'}`}
                >
                  {tier.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
