'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";
import Button from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";

export default function ApiReferenz() {
  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Header */}
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
                <li><span className="text-primary-600">format</span> (optional): &apos;json&apos; | &apos;datev_csv&apos;</li>
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
      </div>
    </PageWrapper>
  );
}
