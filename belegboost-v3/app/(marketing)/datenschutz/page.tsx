'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";

export default function Datenschutz() {
  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Rechtliches</span>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Datenschutzerklärung</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Wir nehmen den Schutz Ihrer persönlichen Daten ernst. Hier erfahren Sie, wie wir Ihre Daten verarbeiten und schützen.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">Stand: Januar 2025</p>

            <section className="mb-12">
              <h2>1. Verantwortlicher</h2>
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
              <div className="not-prose bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 m-0">
                  <strong>BelegBoost GmbH</strong><br />
                  Musterstraße 123<br />
                  80331 München<br />
                  Deutschland<br /><br />
                  E-Mail: datenschutz@belegboost.de<br />
                  Telefon: +49 89 12345678
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
              <h3>2.1 Beim Besuch der Website</h3>
              <p>Bei jedem Zugriff auf unsere Website werden automatisch folgende Daten erfasst:</p>
              <ul>
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                <li>Verwendeter Browser und ggf. das Betriebssystem</li>
              </ul>

              <h3>2.2 Bei der Registrierung</h3>
              <p>Bei der Registrierung für unseren Dienst erheben wir:</p>
              <ul>
                <li>Vollständiger Name</li>
                <li>E-Mail-Adresse</li>
                <li>Name der Kanzlei / Firma</li>
                <li>Gewählte Subdomain</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2>3. Zweck der Datenverarbeitung</h2>
              <p>Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:</p>
              <ul>
                <li>Bereitstellung unserer Dienste und Funktionen</li>
                <li>Verwaltung Ihres Benutzerkontos</li>
                <li>Kommunikation bezüglich unserer Dienste</li>
                <li>Verbesserung unserer Produkte und Services</li>
                <li>Erfüllung rechtlicher Verpflichtungen</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2>4. DATEV-Integration</h2>
              <p>Bei Nutzung unserer DATEV-Export-Funktion werden folgende Daten verarbeitet:</p>
              <ul>
                <li>Transaktionsdaten aus hochgeladenen Dateien</li>
                <li>Mandanteninformationen (Name, Mandantennummer)</li>
                <li>Kontoinformationen und Salden</li>
                <li>Buchungszeiträume</li>
              </ul>
              <p>
                Diese Daten werden ausschließlich zur Erstellung der DATEV-kompatiblen Exportdateien
                verwendet und nach der Verarbeitung nicht dauerhaft auf unseren Servern gespeichert.
              </p>
            </section>

            <section className="mb-12">
              <h2>5. Cookies</h2>
              <p>Unsere Website verwendet Cookies, um die Benutzerfreundlichkeit zu verbessern. Wir setzen folgende Arten von Cookies ein:</p>
              <ul>
                <li><strong>Notwendige Cookies:</strong> Erforderlich für die Grundfunktionen der Website</li>
                <li><strong>Funktionale Cookies:</strong> Speichern Ihre Einstellungen (z.B. Sprachauswahl, Theme)</li>
                <li><strong>Analyse-Cookies:</strong> Helfen uns, die Nutzung der Website zu verstehen</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2>6. Ihre Rechte (DSGVO)</h2>
              <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
              <ul>
                <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen.</li>
                <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
                <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen.</li>
                <li><strong>Einschränkungsrecht (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung verlangen.</li>
                <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in einem gängigen Format erhalten.</li>
                <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Datenverarbeitung widersprechen.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2>7. Datensicherheit</h2>
              <p>
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten
                gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder unbefugten
                Zugriff zu schützen:
              </p>
              <ul>
                <li>SSL/TLS-Verschlüsselung für alle Datenübertragungen</li>
                <li>Verschlüsselte Speicherung sensibler Daten</li>
                <li>Regelmäßige Sicherheitsaudits</li>
                <li>Zugangsbeschränkungen für Mitarbeiter</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2>8. Kontakt für Datenschutzanfragen</h2>
              <p>Für Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte wenden Sie sich bitte an:</p>
              <div className="not-prose bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 m-0">
                  <strong>Datenschutzbeauftragter</strong><br />
                  BelegBoost GmbH<br />
                  E-Mail: datenschutz@belegboost.de
                </p>
              </div>
            </section>

            <section>
              <h2>9. Änderungen dieser Datenschutzerklärung</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an
                geänderte rechtliche Anforderungen oder Änderungen unserer Dienste anzupassen.
                Die aktuelle Version finden Sie stets auf dieser Seite.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
