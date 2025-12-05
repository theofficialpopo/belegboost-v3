'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";
import Button from "@/components/ui/Button";
import { Book, Terminal, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dokumentation() {
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2"><Book size={18} /> Erste Schritte</h3>
              <ul className="space-y-3 text-sm border-l border-slate-200 dark:border-slate-800 ml-2">
                <li className="pl-4 border-l-2 border-primary-500 text-primary-600 font-bold">Einführung</li>
                <li className="pl-4 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/signup')}>Account erstellen</li>
                <li className="pl-4 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Erster Import</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2"><Terminal size={18} /> Integrationen</h3>
              <ul className="space-y-3 text-sm border-l border-slate-200 dark:border-slate-800 ml-2">
                <li className="pl-4 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">DATEV Connect</li>
                <li className="pl-4 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Wise API</li>
                <li className="pl-4 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">PayPal Sync</li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow max-w-3xl">
            <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Einführung in BelegBoost</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                BelegBoost ist die Brücke zwischen modernen Fintech-Lösungen und klassischer Buchhaltung. Diese Dokumentation führt Sie durch die Einrichtung.
              </p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h3>Voraussetzungen</h3>
              <p>Um BelegBoost nutzen zu können, benötigen Sie:</p>
              <ul>
                <li>Einen Zugang zu <strong>DATEV Unternehmen online</strong> oder eine kompatible Import-Software.</li>
                <li>Zugangsdaten für Ihre Bank- oder Fintech-Konten (für API-Verbindungen).</li>
                <li>Einen modernen Webbrowser (Chrome, Firefox, Safari).</li>
              </ul>

              <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 not-prose">
                <h4 className="text-blue-900 dark:text-blue-100 font-bold mb-2 flex items-center gap-2">
                  <FileText size={18} /> Hinweis für Steuerberater
                </h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm m-0">
                  Sie können BelegBoost als White-Label-Lösung für Ihre Mandanten nutzen. Richten Sie dazu in den Kanzlei-Einstellungen Ihre Subdomain ein.
                </p>
              </div>

              <h3>Wie es funktioniert</h3>
              <p>
                BelegBoost normalisiert Transaktionsdaten aus verschiedenen Quellen in ein einheitliches Format.
                Dabei werden Währungen automatisch zum EZB-Referenzkurs umgerechnet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
