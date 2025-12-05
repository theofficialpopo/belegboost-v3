import React from 'react';
import { ArrowLeft, FileText, Shield, Scale, Info } from 'lucide-react';
import Button from '../ui/Button';

interface LegalLayoutProps {
  title: string;
  date?: string;
  children: React.ReactNode;
  onNavigate?: (page: string) => void;
  activePage: 'datenschutz' | 'agb' | 'impressum';
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, date, children, onNavigate, activePage }) => {
  const navItems = [
    { id: 'datenschutz', label: 'Datenschutz', icon: Shield },
    { id: 'agb', label: 'AGB', icon: Scale },
    { id: 'impressum', label: 'Impressum', icon: Info },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start pt-8 pb-20">
            
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block w-64 sticky top-32 shrink-0 space-y-8">
                <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Rechtliches</h5>
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate?.(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    activePage === item.id
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                <item.icon size={16} className={activePage === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Kontakt</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                        Haben Sie Fragen zu unseren rechtlichen Dokumenten?
                    </p>
                    <button 
                        onClick={() => onNavigate?.('kontakt')}
                        className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        Kontakt aufnehmen
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {/* Mobile Back Button & Nav (visible only on small screens) */}
                <div className="lg:hidden mb-8 space-y-6">
                    <button 
                        onClick={() => onNavigate?.('landing')}
                        className="flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Zurück zur Startseite
                    </button>
                    
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                         {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate?.(item.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
                                    activePage === item.id
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <header className="mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
                     <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h1>
                     {date && (
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Stand: {date}
                        </div>
                     )}
                </header>

                <article className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
                    prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300
                    prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                    prose-li:text-slate-600 dark:prose-li:text-slate-300
                    prose-strong:text-slate-900 dark:prose-strong:text-white">
                    {children}
                </article>
            </div>
        </div>
    </div>
  );
};

export const Datenschutz: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => (
  <LegalLayout title="Datenschutzerklärung" date="01. Oktober 2025" onNavigate={onNavigate} activePage="datenschutz">
      <h3>1. Datenschutz auf einen Blick</h3>
      <h4>Allgemeine Hinweise</h4>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
      </p>
      
      <h4>Datenerfassung auf dieser Website</h4>
      <p>
        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br/>
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
      </p>
      <p>
        <strong>Wie erfassen wir Ihre Daten?</strong><br/>
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
      </p>

      <h3>2. Hosting und Content Delivery Networks (CDN)</h3>
      <p>
        Wir hosten die Inhalte unserer Website bei folgenden Anbietern:
      </p>
      <h4>Externes Hosting</h4>
      <p>
        Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
      </p>

      <h3>3. Allgemeine Hinweise und Pflichtinformationen</h3>
      <h4>Datenschutz</h4>
      <p>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
      </p>
      
      <h4>Hinweis zur verantwortlichen Stelle</h4>
      <p>
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
      </p>
      <p>
        BelegBoost GmbH<br/>
        Musterstraße 111<br/>
        10115 Berlin<br/>
        Deutschland
      </p>
      <p>
        Telefon: +49 (0) 30 12345678<br/>
        E-Mail: privacy@belegboost.de
      </p>
      
      <h3>4. Datenerfassung auf unserer Website</h3>
      <h4>Cookies</h4>
      <p>
        Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
      </p>
      
      <h4>Kontaktformular</h4>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>
  </LegalLayout>
);

export const AGB: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => (
  <LegalLayout title="Allgemeine Geschäftsbedingungen" date="15. September 2025" onNavigate={onNavigate} activePage="agb">
      <h3>1. Geltungsbereich</h3>
      <p>
        Für die Geschäftsbeziehung zwischen der BelegBoost GmbH (nachfolgend "Anbieter") und dem Kunden (nachfolgend "Kunde") gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung gültigen Fassung. Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
      </p>
      
      <h3>2. Vertragsgegenstand</h3>
      <p>
        Der Anbieter stellt dem Kunden eine Software-as-a-Service (SaaS) Lösung zur Verfügung, die Bankdaten und Finanztransaktionen in buchhalterische Formate (insb. DATEV) konvertiert. Der genaue Funktionsumfang ergibt sich aus der Leistungsbeschreibung auf der Website.
      </p>
      
      <h3>3. Vertragsschluss</h3>
      <p>
        Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Buttons "Kostenpflichtig bestellen" geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Die Bestätigung des Eingangs der Bestellung folgt unmittelbar nach dem Absenden der Bestellung und stellt noch keine Vertragsannahme dar. Wir können Ihre Bestellung durch Versand einer Auftragsbestätigung per E-Mail oder durch Auslieferung der Ware innerhalb von zwei Tagen annehmen.
      </p>
      
      <h3>4. Preise und Zahlungsbedingungen</h3>
      <p>
        Alle angegebenen Preise sind Nettopreise und verstehen sich zuzüglich der jeweils gültigen gesetzlichen Mehrwertsteuer. Die Nutzungsgebühren sind monatlich oder jährlich im Voraus fällig.
      </p>
      <p>
        Der Kunde kann die Zahlung per Kreditkarte (Visa, Mastercard, American Express) oder SEPA-Lastschrift vornehmen.
      </p>

      <h3>5. Laufzeit und Kündigung</h3>
      <p>
        Der Vertrag wird auf unbestimmte Zeit geschlossen. Die Mindestvertragslaufzeit beträgt einen Monat (bei monatlicher Zahlung) oder ein Jahr (bei jährlicher Zahlung).
      </p>
      <p>
        Das Vertragsverhältnis kann von beiden Parteien mit einer Frist von 14 Tagen zum Ende der jeweiligen Vertragslaufzeit gekündigt werden. Die Kündigung kann direkt im Kundenkonto oder per Textform (z.B. E-Mail) erfolgen.
      </p>

      <h3>6. Gewährleistung und Haftung</h3>
      <p>
        Wir gewährleisten eine Erreichbarkeit der Dienste von 99% im Jahresmittel. Ausgenommen sind Zeiten, in denen der Server aufgrund von technischen oder sonstigen Problemen, die nicht im Einflussbereich des Anbieters liegen (höhere Gewalt, Verschulden Dritter etc.), nicht zu erreichen ist.
      </p>
      <p>
        Für Datenverluste, die durch fehlerhafte Bedienung oder fehlende Backups seitens des Kunden entstehen, übernehmen wir keine Haftung. Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.
      </p>
  </LegalLayout>
);

export const Impressum: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => (
  <LegalLayout title="Impressum" onNavigate={onNavigate} activePage="impressum">
      <h3>Angaben gemäß § 5 TMG</h3>
      <p>
        <strong>BelegBoost GmbH</strong><br/>
        Musterstraße 111<br/>
        10115 Berlin<br/>
        Deutschland
      </p>
      
      <h3>Vertreten durch</h3>
      <p>
        Max Mustermann (Geschäftsführer)<br/>
        Julia Weber (Prokuristin)
      </p>
      
      <h3>Kontakt</h3>
      <p>
        Telefon: +49 (0) 30 12345678<br/>
        E-Mail: kontakt@belegboost.de<br/>
        Web: www.belegboost.de
      </p>
      
      <h3>Registereintrag</h3>
      <p>
        Eintragung im Handelsregister.<br/>
        Registergericht: Amtsgericht Berlin-Charlottenburg<br/>
        Registernummer: HRB 123456
      </p>
      
      <h3>Umsatzsteuer-ID</h3>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br/>
        DE 123 456 789
      </p>

      <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
      <p>
        Max Mustermann<br/>
        Musterstraße 111<br/>
        10115 Berlin
      </p>
      
      <h3>Streitschlichtung</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.<br/>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
  </LegalLayout>
);