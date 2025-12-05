'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";
import Button from "@/components/ui/Button";
import { Check, RefreshCw, FileText, Zap, Layers } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Features() {
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-24 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">All-in-One Lösung</span>
            </div>
            <h1 className="text-4xl font-bold mb-6 font-sans text-slate-900 dark:text-white tracking-tight">
              Features, die Ihre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Buchhaltung</span> transformieren.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Von der automatischen Währungsumrechnung bis zum intelligenten Mapping – BelegBoost automatisiert die mühsame Vorarbeit.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => router.push('/signup')}>Kostenlos starten</Button>
              <Button variant="outline" size="lg" onClick={() => router.push('/dokumentation')}>Dokumentation</Button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Large feature card */}
            <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden relative group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-6">
                  <RefreshCw size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Intelligente Währungsumrechnung</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg max-w-lg">
                  Keine manuellen Umrechnungen mehr. Wir ziehen tagesaktuelle EZB-Referenzkurse für jede Transaktion und berechnen den korrekten Euro-Wert automatisch.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-primary-50 dark:from-primary-900/10 to-transparent"></div>
            </div>

            {/* Dark card */}
            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 dark:bg-slate-200 text-white dark:text-slate-900 rounded-2xl flex items-center justify-center mb-6">
                  <FileText size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">DATEV Kompatibel</h3>
                <p className="text-slate-300 dark:text-slate-600">
                  Exportieren Sie fertige CSV-Stapel, die ohne Anpassung in Kanzlei-Rechnungswesen importiert werden können.
                </p>
              </div>
            </div>

            {/* Small card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 shadow-lg group hover:border-primary-500/30 transition-colors">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Sync</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Verbinden Sie Konten via API und sehen Sie Transaktionen in Echtzeit im Dashboard.
              </p>
            </div>

            {/* Wide card with code preview */}
            <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
                    <Layers size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Automatische Kontierung</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Unsere KI analysiert Verwendungszwecke und schlägt automatisch passende Sachkonten und Personenkonten vor.
                  </p>
                  <ul className="space-y-2">
                    {['Lernt aus historischen Daten', 'Regelbasierte Zuordnung', 'Kreditoren-Erkennung'].map(i => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Check size={16} className="text-purple-500" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 w-full border border-slate-100 dark:border-slate-700">
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
                      <span className="text-slate-400">Verwendungszweck</span>
                      <span className="text-slate-400">Konto</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 dark:text-slate-300">Adobe Systems Dublin</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">4964</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 dark:text-slate-300">Google Cloud EMEA</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">4930</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 dark:text-slate-300">DB Vertrieb GmbH</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">4670</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
