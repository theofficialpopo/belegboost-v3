'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";
import Button from "@/components/ui/Button";
import { FileText, ArrowRight, Zap, Globe, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const integrations = [
  { name: 'PayPal', icon: 'PP', color: 'bg-blue-800' },
  { name: 'Stripe', icon: 'ST', color: 'bg-indigo-600' },
  { name: 'Revolut', icon: 'RE', color: 'bg-black' },
  { name: 'Lexoffice', icon: 'LX', color: 'bg-orange-500' },
  { name: 'SevDesk', icon: 'SD', color: 'bg-green-500' },
  { name: 'Amex', icon: 'AM', color: 'bg-blue-500' },
  { name: 'Pliant', icon: 'PL', color: 'bg-slate-800' },
  { name: 'Moss', icon: 'MO', color: 'bg-purple-600' },
  { name: 'Qonto', icon: 'QO', color: 'bg-black' },
  { name: 'N26', icon: 'N26', color: 'bg-teal-500' },
  { name: 'Holvi', icon: 'HV', color: 'bg-blue-400' },
  { name: 'Pleo', icon: 'PL', color: 'bg-pink-500' },
];

export default function Integration() {
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-sm mb-6">
              <Globe size={14} className="text-primary-500" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Multi-Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Nahtlose Integrationen</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              BelegBoost fungiert als Middleware zwischen modernen Fintech-Lösungen und klassischer deutscher Buchhaltung.
            </p>
          </div>

          {/* Primary Integrations - Bento Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* DATEV Integration - Primary */}
            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 rounded-[2rem] relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText size={140} />
              </div>
              <div className="relative z-10">
                <div className="bg-green-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-green-600/30">DV</div>
                <h3 className="text-2xl font-bold mb-2">DATEV</h3>
                <p className="text-slate-300 dark:text-slate-600 mb-6">
                  Unsere Kernkompetenz. Exportieren Sie Daten direkt in DATEV Unternehmen online oder als Import-Datei für Kanzlei-Rechnungswesen.
                </p>
                <Button size="sm" variant="outline" className="bg-white/10 dark:bg-slate-900/10 border-white/20 dark:border-slate-900/20 text-white dark:text-slate-900 hover:bg-white/20 dark:hover:bg-slate-900/20" onClick={() => router.push('/dokumentation')}>
                  Dokumentation ansehen
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Wise Integration */}
            <div className="p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-[2rem] shadow-sm hover:shadow-lg transition-all">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-600/20">Wi</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Wise (TransferWise)</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Verbinden Sie Multi-Currency Konten via API. Transaktionen werden automatisch abgerufen und normalisiert.
              </p>
              <Button variant="outline" size="sm" onClick={() => router.push('/signup')}>Einrichten</Button>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-[2rem] p-8 md:p-10 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-slate-900 dark:text-white text-center">So funktioniert die Integration</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe size={24} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. Verbinden</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Autorisieren Sie Ihre Bankkonten über sichere OAuth-Verbindungen.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <RefreshCw size={24} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. Synchronisieren</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Transaktionen werden automatisch abgerufen und normalisiert.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. Exportieren</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Laden Sie fertige DATEV-kompatible Buchungsstapel herunter.</p>
              </div>
            </div>
          </div>

          {/* Other Integrations */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Weitere Verbindungen</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {integrations.map((tool) => (
                <div key={tool.name} className="flex items-center gap-3 p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/40 dark:border-white/5 rounded-xl hover:border-primary-400/50 dark:hover:border-primary-500/30 transition-colors cursor-default shadow-sm hover:shadow-md">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md ${tool.color}`}>
                    {tool.icon}
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-[2rem] p-10 border border-primary-100 dark:border-primary-800/30">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ihre Bank fehlt?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Wir erweitern ständig unsere Integrationen. Kontaktieren Sie uns, wenn Sie eine bestimmte Bank oder Plattform vermissen.
            </p>
            <Button onClick={() => router.push('/kontakt')}>Integration anfragen</Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
