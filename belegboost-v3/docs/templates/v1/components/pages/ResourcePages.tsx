import React from 'react';
import { Book, Code, Terminal, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

interface PageProps {
  onNavigate?: (page: string) => void;
}

// --- Blog Page ---
export const BlogPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="space-y-12 animate-in slide-in-from-bottom-4 fade-in duration-500">
    <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
            <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">Blog & Updates</h1>
            <p className="text-slate-500 dark:text-slate-400">Neuigkeiten aus der Produktentwicklung und Tipps für Steuerberater.</p>
        </div>
        <div className="flex gap-2">
            {['Alle', 'Produkt', 'Tutorials', 'Rechtliches'].map(tag => (
                <button key={tag} className="px-4 py-2 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white hover:shadow-md transition-all">
                    {tag}
                </button>
            ))}
        </div>
    </div>

    {/* Featured Post */}
    <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[400px] flex items-end group cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
         {/* Placeholder Image Gradient */}
         <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-800 group-hover:scale-105 transition-transform duration-700"></div>
         
         <div className="relative z-20 p-8 md:p-12 max-w-3xl">
             <span className="text-primary-400 font-bold text-sm mb-2 block">Produkt Update • 12. Okt 2025</span>
             <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Die neue Wise Integration ist da: Echtzeit-Sync für alle Währungen.</h2>
             <p className="text-slate-300 text-lg mb-6 line-clamp-2">
                 Wir haben unsere Schnittstelle zu Wise komplett überarbeitet. Ab sofort werden Transaktionen in Echtzeit synchronisiert und Wechselkursgewinne automatisch verbucht.
             </p>
             <span className="inline-flex items-center font-bold text-white group-hover:translate-x-2 transition-transform">
                 Beitrag lesen <ArrowRight size={18} className="ml-2" />
             </span>
         </div>
    </div>

    {/* Post Grid */}
    <div className="grid md:grid-cols-2 gap-8">
        {[
            { date: '28. Sep 2025', category: 'Tutorials', title: 'So optimieren Sie den DATEV-Import', excerpt: 'Tipps & Tricks für Steuerberater: Wie Sie Buchungsstapel effizienter verarbeiten und Fehler vermeiden.' },
            { date: '15. Aug 2025', category: 'Unternehmen', title: 'BelegBoost erhält ISO 27001 Zertifizierung', excerpt: 'Ein Meilenstein für unsere Datensicherheit: Wir sind offiziell zertifiziert und erfüllen höchste Standards.' },
            { date: '02. Aug 2025', category: 'Rechtliches', title: 'GoBD Updates 2025', excerpt: 'Was Sie über die neuen Anforderungen an die digitale Belegablage wissen müssen.' },
            { date: '20. Jul 2025', category: 'Produkt', title: 'Dark Mode ist da!', excerpt: 'Arbeiten Sie augenschonender mit unserem neuen Dark Mode für das Kanzlei-Dashboard.' }
        ].map((post, i) => (
            <article key={i} className="flex flex-col p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-800 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4 text-xs font-bold">
                    <span className="text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded">{post.category}</span>
                    <span className="text-slate-400">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{post.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 flex-grow">{post.excerpt}</p>
                <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center group-hover:translate-x-1 transition-transform">Mehr erfahren <ArrowRight size={16} className="ml-1"/></span>
            </article>
        ))}
    </div>
  </div>
);

// --- Documentation Page ---
export const DocumentationPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="flex flex-col md:flex-row gap-12 animate-in slide-in-from-bottom-4 fade-in duration-500">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2"><Book size={18}/> Erste Schritte</h3>
            <ul className="space-y-3 text-sm border-l border-slate-200 dark:border-slate-800 ml-2">
                <li className="pl-4 border-l-2 border-primary-500 text-primary-600 font-bold">Einführung</li>
                <li className="pl-4 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('signup')}>Account erstellen</li>
                <li className="pl-4 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Erster Import</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2"><Terminal size={18}/> Integrationen</h3>
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
              
              <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
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
);

// --- API Page ---
export const ApiReferencePage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="space-y-12 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="flex justify-between items-start">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">API Referenz</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
                Integrieren Sie BelegBoost direkt in Ihre internen Tools oder Workflows.
                Unsere API ist REST-basiert und nutzt Standard HTTP Response Codes.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
              <ExternalLink size={16} className="mr-2" /> Swagger UI
          </Button>
      </div>

      {/* Authentication Section */}
      <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Authentifizierung</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Alle Anfragen müssen über einen Bearer Token authentifiziert werden.
                  Erstellen Sie einen API Key in Ihren Dashboard-Einstellungen.
              </p>
              <div className="flex items-center gap-2 text-sm font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded-lg w-fit text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-primary-600">Header:</span> Authorization: Bearer &lt;token&gt;
              </div>
          </div>
          <div className="bg-slate-950 rounded-2xl p-6 shadow-2xl border border-slate-800 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs text-slate-500 font-mono">bash</span>
              </div>
              <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
{`curl -X POST https://api.belegboost.io/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "bb_prod_12345",
    "client_secret": "sk_live_..."
  }'`}
              </pre>
          </div>
      </div>

      {/* Endpoint Section */}
      <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div>
              <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-bold text-xs rounded-full">GET</span>
                  <code className="text-slate-900 dark:text-white font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">/v1/transactions</code>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Transaktionen abrufen</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Liefert eine Liste aller normalisierten Transaktionen für einen bestimmten Zeitraum.
                  Das Ergebnis enthält bereits die umgerechneten EUR-Werte.
              </p>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Query Parameters</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-mono">
                  <li><span className="text-primary-600">start_date</span> (required): ISO-8601 Date</li>
                  <li><span className="text-primary-600">end_date</span> (required): ISO-8601 Date</li>
                  <li><span className="text-primary-600">format</span> (optional): 'json' | 'datev_csv'</li>
              </ul>
          </div>
          <div className="bg-slate-950 rounded-2xl p-6 shadow-2xl border border-slate-800 overflow-hidden">
               <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                  <span className="text-xs text-slate-500 font-mono">Response Example</span>
                  <span className="text-xs text-green-500 font-mono">200 OK</span>
              </div>
              <pre className="font-mono text-sm text-blue-300 overflow-x-auto">
{`{
  "data": [
    {
      "id": "tx_987654321",
      "date": "2025-10-12",
      "merchant": "Github Inc.",
      "amount": {
        "value": 21.00,
        "currency": "EUR"
      },
      "original_amount": {
        "value": 22.50,
        "currency": "USD"
      }
    }
  ]
}`}
              </pre>
          </div>
      </div>
  </div>
);