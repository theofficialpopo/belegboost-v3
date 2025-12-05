'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";

const team = [
  { name: "Max Mustermann", role: "Co-Founder & CEO" },
  { name: "Julia Weber", role: "Co-Founder & CTO" },
  { name: "Tom Schmidt", role: "Co-Founder & CPO" }
];

export default function UeberUns() {
  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
              Wir vereinfachen <br />die <span className="text-primary-600">Finanzwelt</span>.
            </h1>
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
              {team.map((member, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="h-64 bg-slate-100 dark:bg-slate-800 w-full grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{member.name}</h4>
                    <p className="text-primary-600 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
