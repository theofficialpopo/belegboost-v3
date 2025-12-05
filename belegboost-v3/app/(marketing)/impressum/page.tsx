'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";

export default function Impressum() {
  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Rechtliches</span>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Impressum</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Rechtliche Informationen und Kontaktmöglichkeiten.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm prose prose-slate dark:prose-invert max-w-none">

            <section className="mb-12">
              <h2>Angaben gemäß § 5 TMG</h2>
              <div className="not-prose bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 text-lg m-0">
                  <strong>BelegBoost GmbH</strong><br /><br />
                  Musterstraße 123<br />
                  80331 München<br />
                  Deutschland
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2>Vertreten durch</h2>
              <p>
                Geschäftsführer: Max Mustermann
              </p>
            </section>

            <section className="mb-12">
              <h2>Kontakt</h2>
              <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3 mt-0">Telefon</h3>
                  <p className="text-slate-600 dark:text-slate-400 m-0">+49 89 12345678</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3 mt-0">E-Mail</h3>
                  <p className="text-slate-600 dark:text-slate-400 m-0">info@belegboost.de</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Registereintrag</h2>
              <div className="not-prose bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 m-0">
                  Eintragung im Handelsregister<br />
                  Registergericht: Amtsgericht München<br />
                  Registernummer: HRB 123456
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2>Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                <span className="font-mono font-bold">DE 123 456 789</span>
              </p>
            </section>

            <section className="mb-12">
              <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>
                Max Mustermann<br />
                Musterstraße 123<br />
                80331 München
              </p>
            </section>

            <section className="mb-12">
              <h2>EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <br />
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section className="mb-12">
              <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2>Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
                wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
                fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach
                den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung
                ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                Inhalte umgehend entfernen.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
