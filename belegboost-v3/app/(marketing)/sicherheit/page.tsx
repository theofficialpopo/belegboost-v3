'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";
import Button from "@/components/ui/Button";
import { Shield, Lock, Server } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sicherheit() {
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 shadow-sm mb-6 text-green-700 dark:text-green-400">
              <Shield size={14} />
              <span className="text-xs font-bold uppercase tracking-wide">Enterprise Grade Security</span>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Ihre Daten, sicher verwahrt.</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Wir setzen auf modernste Verschlüsselungsstandards und Hosting ausschließlich in Deutschland.
            </p>
          </div>

          {/* Security Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">End-to-End Verschlüsselung</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Datenübertragung via TLS 1.3 und Speicherung mit AES-256 Verschlüsselung.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center hover:shadow-xl transition-shadow scale-105 z-10 shadow-lg border-primary-200 dark:border-primary-800">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ISO 27001 Zertifiziert</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Unser Rechenzentrum und unsere Prozesse sind nach internationalen Standards zertifiziert.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Server size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Server in Deutschland</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Hosting ausschließlich in Frankfurt am Main. Volle DSGVO-Konformität.
              </p>
            </div>
          </div>

          {/* Compliance Section */}
          <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Datenschutz & Compliance</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Als deutsches Unternehmen unterliegen wir den strengen Vorgaben der Datenschutzgrundverordnung (DSGVO).
                Wir schließen mit jedem Kunden einen Vertrag zur Auftragsverarbeitung (AVV) ab.
              </p>
              <Button variant="outline" onClick={() => router.push('/kontakt')}>AVV Muster anfragen</Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
