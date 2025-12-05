'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";

export default function AGB() {
  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Rechtliches</span>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Allgemeine Geschäftsbedingungen</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Unsere rechtlichen Rahmenbedingungen für eine vertrauensvolle Zusammenarbeit.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">Stand: Januar 2025</p>

            <section className="mb-12">
              <h2>§ 1 Geltungsbereich</h2>
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
                der BelegBoost GmbH (nachfolgend &quot;Anbieter&quot;) und dem Kunden über die Nutzung der
                BelegBoost-Plattform.
              </p>
              <p>
                (2) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der
                Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
              <p>
                (3) Die BelegBoost-Plattform richtet sich ausschließlich an Unternehmer im Sinne
                des § 14 BGB, insbesondere an Steuerberater, Buchhalter und deren Kanzleien.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 2 Leistungsbeschreibung</h2>
              <p>
                (1) BelegBoost ist eine cloudbasierte Software-Plattform zur Verarbeitung und
                Konvertierung von Zahlungsdaten verschiedener Anbieter (z.B. American Express)
                in DATEV-kompatible Exportformate.
              </p>
              <p>
                (2) Der Leistungsumfang umfasst:
              </p>
              <ul>
                <li>Upload und Verarbeitung von Transaktionsdaten</li>
                <li>Automatische Konvertierung in DATEV-Formate</li>
                <li>Mandantenverwaltung</li>
                <li>Team- und Benutzerverwaltung</li>
                <li>Export-Funktionen</li>
              </ul>
              <p>
                (3) Der genaue Funktionsumfang richtet sich nach dem gewählten Tarif gemäß der
                aktuellen Preisliste.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 3 Vertragsschluss und Registrierung</h2>
              <p>
                (1) Die Registrierung auf der Plattform stellt ein Angebot des Kunden auf Abschluss
                eines Nutzungsvertrages dar.
              </p>
              <p>
                (2) Der Vertrag kommt zustande durch die Freischaltung des Kundenkontos durch den
                Anbieter oder durch die erste Nutzung der Plattform nach der Registrierung.
              </p>
              <p>
                (3) Der Kunde ist verpflichtet, bei der Registrierung wahrheitsgemäße und vollständige
                Angaben zu machen und diese aktuell zu halten.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 4 Pflichten des Kunden</h2>
              <p>
                (1) Der Kunde ist verpflichtet:
              </p>
              <ul>
                <li>Seine Zugangsdaten geheim zu halten und vor unbefugtem Zugriff zu schützen</li>
                <li>Den Anbieter unverzüglich zu informieren, wenn Anhaltspunkte für einen Missbrauch bestehen</li>
                <li>Die Plattform nur im Rahmen der geltenden Gesetze zu nutzen</li>
                <li>Keine Daten hochzuladen, zu deren Verarbeitung er nicht berechtigt ist</li>
                <li>Die Rechte Dritter nicht zu verletzen</li>
              </ul>
              <p>
                (2) Der Kunde stellt den Anbieter von allen Ansprüchen Dritter frei, die auf einer
                rechtswidrigen Nutzung der Plattform durch den Kunden beruhen.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 5 Preise und Zahlung</h2>
              <p>
                (1) Es gelten die zum Zeitpunkt des Vertragsschlusses aktuellen Preise gemäß der
                auf der Website veröffentlichten Preisliste.
              </p>
              <p>
                (2) Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.
              </p>
              <p>
                (3) Die Abrechnung erfolgt monatlich oder jährlich im Voraus, je nach gewähltem
                Abrechnungszeitraum.
              </p>
              <p>
                (4) Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zu zahlen.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 6 Verfügbarkeit und Wartung</h2>
              <p>
                (1) Der Anbieter bemüht sich um eine Verfügbarkeit der Plattform von 99,5% im
                Jahresdurchschnitt.
              </p>
              <p>
                (2) Geplante Wartungsarbeiten werden nach Möglichkeit außerhalb der üblichen
                Geschäftszeiten durchgeführt und mindestens 48 Stunden im Voraus angekündigt.
              </p>
              <p>
                (3) Der Anbieter haftet nicht für Ausfälle, die durch höhere Gewalt, Störungen
                im Internet oder sonstige Umstände außerhalb seines Einflussbereichs verursacht werden.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 7 Haftung</h2>
              <p>
                (1) Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens,
                des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig
                verursachte Schäden.
              </p>
              <p>
                (2) Für einfache Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
                Vertragspflichten. Die Haftung ist auf den vertragstypischen, vorhersehbaren
                Schaden begrenzt.
              </p>
              <p>
                (3) Die Haftung für den Verlust von Daten ist auf den typischen
                Wiederherstellungsaufwand beschränkt, der bei ordnungsgemäßer Datensicherung
                durch den Kunden entstanden wäre.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 8 Vertragslaufzeit und Kündigung</h2>
              <p>
                (1) Der Vertrag wird auf unbestimmte Zeit geschlossen und kann von beiden Seiten
                mit einer Frist von einem Monat zum Ende des jeweiligen Abrechnungszeitraums
                gekündigt werden.
              </p>
              <p>
                (2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
              </p>
              <p>
                (3) Nach Vertragsende werden die Daten des Kunden nach einer Karenzzeit von
                30 Tagen gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 9 Datenschutz</h2>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung,
                die unter <a href="/datenschutz">/datenschutz</a> abrufbar ist.
              </p>
            </section>

            <section className="mb-12">
              <h2>§ 10 Schlussbestimmungen</h2>
              <p>
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
                UN-Kaufrechts.
              </p>
              <p>
                (2) Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist München.
              </p>
              <p>
                (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit
                der übrigen Bestimmungen unberührt.
              </p>
            </section>

            <section>
              <h2>Kontakt</h2>
              <div className="not-prose bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 m-0">
                  <strong>BelegBoost GmbH</strong><br />
                  Musterstraße 123<br />
                  80331 München<br />
                  Deutschland<br /><br />
                  E-Mail: info@belegboost.de<br />
                  Telefon: +49 89 12345678
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
