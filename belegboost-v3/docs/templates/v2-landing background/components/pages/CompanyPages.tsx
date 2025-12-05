import React from 'react';
import { MapPin, Mail, Phone, ArrowRight, Heart, Users, Globe } from 'lucide-react';
import Button from '../ui/Button';

interface PageProps {
  onNavigate?: (page: string) => void;
}

// --- About Page ---
export const AboutPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="space-y-24 animate-in slide-in-from-bottom-4 fade-in duration-500">
    {/* Hero */}
    <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">Wir vereinfachen <br/>die <span className="text-primary-600">Finanzwelt</span>.</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
            BelegBoost wurde 2023 mit einem Ziel gegründet: Die Brücke zwischen der neuen Welt der Fintechs und der etablierten Welt der deutschen Steuerberatung zu bauen.
        </p>
        <div className="grid grid-cols-3 gap-8 border-y border-slate-100 dark:border-slate-800 py-8">
            {[
                { label: 'Gegründet', value: '2023' },
                { label: 'Transaktionen', value: '1M+' },
                { label: 'Kanzleien', value: '250+' }
            ].map(stat => (
                <div key={stat.label}>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
            ))}
        </div>
    </div>

    {/* Mission */}
    <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Unsere Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Steuerberater sollten keine Zeit mit manueller Datenkonvertierung oder dem Abtippen von PDF-Auszügen verbringen. 
                Wir glauben an eine Welt, in der Finanzdaten fließen – sicher, strukturiert und automatisch.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Unser Team aus Entwicklern und Finanzexperten arbeitet täglich daran, die beste Middleware für den deutschen Markt zu bauen.
            </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-200 dark:bg-slate-800 h-64 rounded-2xl w-full translate-y-8"></div>
             <div className="bg-slate-300 dark:bg-slate-700 h-64 rounded-2xl w-full"></div>
        </div>
    </div>

    {/* Team */}
    <div>
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Das Führungsteam</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {['Max Mustermann', 'Julia Weber', 'Tom Schmidt'].map((name, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="h-64 bg-slate-100 dark:bg-slate-800 w-full grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                    <div className="p-6">
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">{name}</h4>
                        <p className="text-primary-600 text-sm">Co-Founder</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </div>
);

// --- Career Page ---
export const CareerPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Werde Teil des Teams</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
            Wir suchen Talente, die mit uns die Finanzbranche digitalisieren. Arbeite von überall und gestalte die Zukunft.
        </p>
      </div>
    
      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-8">
          {[
              { icon: Globe, title: 'Remote First', desc: 'Arbeite von wo du willst. Unser HQ ist in Berlin, aber wir sind weltweit verteilt.' },
              { icon: Heart, title: 'Gesundheit & Sport', desc: 'Urban Sports Club Mitgliedschaft und Budget für dein Home Office Setup.' },
              { icon: Users, title: 'Team Events', desc: 'Regelmäßige Offsites und Meetups in ganz Europa.' }
          ].map((benefit, i) => (
              <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <benefit.icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-500">{benefit.desc}</p>
              </div>
          ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Offene Stellen</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
                { role: 'Senior Frontend Developer (m/w/d)', type: 'Remote / Berlin', dept: 'Engineering' },
                { role: 'Product Manager (m/w/d)', type: 'Berlin', dept: 'Product' },
                { role: 'Customer Success Manager (m/w/d)', type: 'Remote', dept: 'Sales' },
                { role: 'DevOps Engineer (m/w/d)', type: 'Remote', dept: 'Engineering' },
            ].map((job, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{job.role}</h4>
                        <div className="flex items-center gap-2 justify-center md:justify-start text-sm text-slate-500 mt-1">
                            <span>{job.dept}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="group-hover:border-primary-500 group-hover:text-primary-600" onClick={() => onNavigate?.('kontakt')}>
                        Details ansehen <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            ))}
          </div>
      </div>
  </div>
);

// --- Contact Page ---
export const ContactPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="grid lg:grid-cols-2 gap-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div>
          <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Kontaktieren Sie uns</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
              Haben Sie Fragen zu unserem Produkt oder benötigen Sie Unterstützung? Unser Team ist für Sie da.
          </p>
          
          <div className="space-y-8">
              <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-2xl shrink-0"><MapPin size={24}/></div>
                  <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Anschrift</h4>
                      <p className="text-slate-600 dark:text-slate-400">BelegBoost GmbH<br/>Musterstraße 111<br/>10115 Berlin</p>
                  </div>
              </div>
              <div className="flex items-start gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl shrink-0"><Mail size={24}/></div>
                  <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">E-Mail</h4>
                      <p className="text-slate-600 dark:text-slate-400">kontakt@belegboost.de<br/>support@belegboost.de</p>
                  </div>
              </div>
              <div className="flex items-start gap-6">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-2xl shrink-0"><Phone size={24}/></div>
                  <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Telefon</h4>
                      <p className="text-slate-600 dark:text-slate-400">+49 (0) 30 12345678<br/>Mo-Fr 09:00 - 18:00</p>
                  </div>
              </div>
          </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Nachricht senden</h3>
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Danke für Ihre Nachricht!"); }}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Name</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Ihr Name" />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Firma</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Firma GmbH" />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">E-Mail</label>
                  <input type="email" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="ihre@email.de" />
              </div>
              <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Nachricht</label>
                  <textarea className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-32 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none" placeholder="Wie können wir helfen?"></textarea>
              </div>
              <Button fullWidth className="py-4 rounded-xl text-lg">Nachricht senden</Button>
          </form>
      </div>
  </div>
);