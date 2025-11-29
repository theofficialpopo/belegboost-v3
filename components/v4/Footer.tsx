import React from 'react';
import { CreditCard, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Plattform",
      links: [
        { label: "Funktionen", href: "#" },
        { label: "Integrationen", href: "#" },
        { label: "Sicherheit", href: "#" },
        { label: "Roadmap", href: "#" },
      ]
    },
    {
      title: "Ressourcen",
      links: [
        { label: "Help Center", href: "#" },
        { label: "DATEV Guides", href: "#" },
        { label: "API Dokumentation", href: "#" },
        { label: "Status", href: "#" },
      ]
    },
    {
      title: "Rechtliches",
      links: [
        { label: "Impressum", href: "#" },
        { label: "Datenschutz", href: "#" },
        { label: "AGB", href: "#" },
        { label: "Cookie-Einstellungen", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 group">
              <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-1.5 rounded-lg">
                <CreditCard size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-sans">BelegBoost</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Die automatisierte Schnittstelle zwischen modernen Fintech-Lösungen und klassischer DATEV-Buchhaltung.
              <br/><br/>
              Made with <span className="text-red-500">❤</span> in Berlin.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {sections.map((section) => (
            <div key={section.title} className="lg:col-span-1 sm:col-span-1">
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

            {/* Newsletter / Contact (Optional 4th col) */}
            <div className="lg:col-span-1">
                 <h4 className="text-slate-900 dark:text-white font-bold mb-6">Kontakt</h4>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">support@belegboost.de</p>
                 <p className="text-sm text-slate-500 dark:text-slate-400">+49 (0) 30 12345678</p>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            © {currentYear} BelegBoost GmbH. 
          </p>
          <div className="flex gap-2 text-sm text-slate-400 dark:text-slate-500">
             <span>Serverstatus:</span>
             <span className="flex items-center gap-1.5 text-green-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Operational
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;