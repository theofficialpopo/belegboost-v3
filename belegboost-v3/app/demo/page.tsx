'use client';

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { FileText, Users, Settings, ArrowRight, Shield, Zap } from "lucide-react";

export default function DemoLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">Demo-Modus</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Erleben Sie BelegBoost <span className="text-primary-600">in Aktion</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Testen Sie alle Funktionen mit Demo-Daten. Keine Registrierung erforderlich.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push('/demo/dashboard')}>
              Dashboard testen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/demo/portal')}>
              Portal testen
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div
            onClick={() => router.push('/demo/dashboard')}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
              Belege verwalten
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Sehen Sie eingehende Exporte, prüfen Sie Transaktionen und exportieren Sie nach DATEV.
            </p>
          </div>

          <div
            onClick={() => router.push('/demo/dashboard/team')}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
              Team verwalten
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Laden Sie Mitarbeiter ein und vergeben Sie Rollen und Berechtigungen.
            </p>
          </div>

          <div
            onClick={() => router.push('/demo/portal')}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
              Mandanten-Portal
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Testen Sie das Portal, das Ihre Mandanten für den Upload nutzen.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 flex items-start gap-4">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Shield className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-1">Demo-Hinweis</h4>
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              Alle Daten in diesem Demo-Modus sind Beispieldaten. Änderungen werden nicht gespeichert.
              Für echte Nutzung erstellen Sie bitte ein Konto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
