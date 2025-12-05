'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";
import Button from "@/components/ui/Button";
import { Globe, Heart, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const benefits = [
  { icon: Globe, title: 'Remote First', desc: 'Arbeite von wo du willst. Unser HQ ist in München, aber wir sind weltweit verteilt.' },
  { icon: Heart, title: 'Gesundheit & Sport', desc: 'Urban Sports Club Mitgliedschaft und Budget für dein Home Office Setup.' },
  { icon: Users, title: 'Team Events', desc: 'Regelmäßige Offsites und Meetups in ganz Europa.' }
];

const openPositions = [
  { role: 'Senior Frontend Developer (m/w/d)', type: 'Remote / München', dept: 'Engineering' },
  { role: 'Product Manager (m/w/d)', type: 'München', dept: 'Product' },
  { role: 'Customer Success Manager (m/w/d)', type: 'Remote', dept: 'Sales' },
  { role: 'DevOps Engineer (m/w/d)', type: 'Remote', dept: 'Engineering' },
];

export default function Karriere() {
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Werde Teil des Teams</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Wir suchen Talente, die mit uns die Finanzbranche digitalisieren. Arbeite von überall und gestalte die Zukunft.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <benefit.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-500">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Open Positions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Offene Stellen</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {openPositions.map((job, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                  <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{job.role}</h4>
                    <div className="flex items-center gap-2 justify-center md:justify-start text-sm text-slate-500 mt-1">
                      <span>{job.dept}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:border-primary-500 group-hover:text-primary-600" onClick={() => router.push('/kontakt')}>
                    Details ansehen <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
