import React from 'react';
import { FileText, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Produkt",
      links: [
        { label: "Features", href: "#" },
        { label: "Preise", href: "#" },
        { label: "Integration", href: "#" },
        { label: "Sicherheit", href: "#" },
      ]
    },
    {
      title: "Ressourcen",
      links: [
        { label: "Dokumentation", href: "#" },
        { label: "Blog", href: "#" },
        { label: "API Referenz", href: "#" },
        { label: "Demo Portal", href: "#" },
      ]
    },
    {
      title: "Unternehmen",
      links: [
        { label: "Über uns", href: "#" },
        { label: "Karriere", href: "#" },
        { label: "Kontakt", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 group">
              <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-1.5 rounded-lg transition-colors">
                <FileText size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-sans group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">BelegBoost</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Die sichere Brücke zwischen American Express Exporten und DATEV Buchhaltungssoftware. Entwickelt für deutsche Steuerberater.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {sections.map((section) => (
            <div key={section.title} className="lg:col-span-1 sm:col-span-1">
              <h4 className="text-slate-900 dark:text-slate-200 font-bold mb-6">{section.title}</h4>
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
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            © {currentYear} BelegBoost GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">Datenschutz</a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">AGB</a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">Impressum</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
