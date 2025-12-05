import React from 'react';
import { Check, Shield, Lock, Server, Globe, Zap, FileText, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import Button from '../ui/Button';

interface PageProps {
  onNavigate?: (page: string) => void;
}

// --- Features Page ---
export const FeaturesPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="space-y-24 animate-in slide-in-from-bottom-4 fade-in duration-500">
    {/* Hero */}
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
         <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
         </span>
         <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">All-in-One Lösung</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans text-slate-900 dark:text-white tracking-tight">
        Features, die Ihre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Buchhaltung</span> transformieren.
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        Von der automatischen Währungsumrechnung bis zum intelligenten Mapping – BelegBoost automatisiert die mühsame Vorarbeit.
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg" onClick={() => onNavigate?.('signup')}>Kostenlos starten</Button>
        <Button variant="outline" size="lg" onClick={() => onNavigate?.('dokumentation')}>Dokumentation</Button>
      </div>
    </div>
    
    {/* Feature Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden relative group">
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

      <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden">
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
      
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-lg group hover:border-primary-500/30 transition-colors">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Sync</h3>
          <p className="text-slate-600 dark:text-slate-400">
             Verbinden Sie Konten via API und sehen Sie Transaktionen in Echtzeit im Dashboard.
          </p>
      </div>

      <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
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
                 {/* Mock UI Code snippet style */}
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
);

// --- Integration Page ---
export const IntegrationPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Nahtlose Integrationen</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        BelegBoost fungiert als Middleware zwischen modernen Fintech-Lösungen und klassischer Buchhaltung.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
       {/* Primary Integration */}
       <div className="p-8 border border-primary-100 dark:border-primary-900/30 bg-primary-50/50 dark:bg-primary-900/10 rounded-3xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
               <FileText size={120} />
           </div>
           <div className="relative z-10">
               <div className="bg-green-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-green-600/20">DV</div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">DATEV</h3>
               <p className="text-slate-600 dark:text-slate-300 mb-6">
                   Unsere Kernkompetenz. Exportieren Sie Daten direkt in DATEV Unternehmen online oder als Import-Datei für Kanzlei-Rechnungswesen.
               </p>
               <Button size="sm" onClick={() => onNavigate?.('dokumentation')}>Dokumentation ansehen</Button>
           </div>
       </div>

       <div className="p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-600/20">Wi</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Wise (TransferWise)</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
                Verbinden Sie Multi-Currency Konten via API. Transaktionen werden automatisch abgerufen und normalisiert.
            </p>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.('signup')}>Einrichten</Button>
       </div>
    </div>

    <div>
        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Weitere Verbindungen</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { name: 'PayPal', icon: 'PP', color: 'bg-blue-800' },
                { name: 'Stripe', icon: 'ST', color: 'bg-indigo-600' },
                { name: 'Revolut', icon: 'RE', color: 'bg-black' },
                { name: 'Lexoffice', icon: 'LX', color: 'bg-orange-500' },
                { name: 'SevDesk', icon: 'SD', color: 'bg-green-500' },
                { name: 'Amex', icon: 'AM', color: 'bg-blue-500' },
                { name: 'Pliant', icon: 'PL', color: 'bg-slate-800' },
                { name: 'Moss', icon: 'MO', color: 'bg-purple-600' },
            ].map((tool) => (
                <div key={tool.name} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary-400 transition-colors cursor-default">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md ${tool.color}`}>
                        {tool.icon}
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{tool.name}</span>
                </div>
            ))}
        </div>
    </div>
  </div>
);

// --- Security Page ---
export const SecurityPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
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

    <div className="grid md:grid-cols-3 gap-8">
         <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">End-to-End Verschlüsselung</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
                Datenübertragung via TLS 1.3 und Speicherung mit AES-256 Verschlüsselung.
            </p>
         </div>

         <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 text-center hover:shadow-xl transition-shadow scale-105 z-10 shadow-lg border-primary-200 dark:border-primary-800">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ISO 27001 Zertifiziert</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
                Unser Rechenzentrum und unsere Prozesse sind nach internationalen Standards zertifiziert.
            </p>
         </div>

         <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Server size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Server in Deutschland</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
                Hosting ausschließlich in Frankfurt am Main. Volle DSGVO-Konformität.
            </p>
         </div>
    </div>
    
    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Datenschutz & Compliance</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Als deutsches Unternehmen unterliegen wir den strengen Vorgaben der Datenschutzgrundverordnung (DSGVO). 
                Wir schließen mit jedem Kunden einen Vertrag zur Auftragsverarbeitung (AVV) ab.
            </p>
            <Button variant="outline" onClick={() => onNavigate?.('kontakt')}>AVV Muster anfragen</Button>
        </div>
    </div>
  </div>
);