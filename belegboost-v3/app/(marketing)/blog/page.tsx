'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  { date: '12. Okt 2025', category: 'Produkt Update', title: 'Die neue Wise Integration ist da: Echtzeit-Sync für alle Währungen.', excerpt: 'Wir haben unsere Schnittstelle zu Wise komplett überarbeitet. Ab sofort werden Transaktionen in Echtzeit synchronisiert und Wechselkursgewinne automatisch verbucht.', featured: true },
  { date: '28. Sep 2025', category: 'Tutorials', title: 'So optimieren Sie den DATEV-Import', excerpt: 'Tipps & Tricks für Steuerberater: Wie Sie Buchungsstapel effizienter verarbeiten und Fehler vermeiden.' },
  { date: '15. Aug 2025', category: 'Unternehmen', title: 'BelegBoost erhält ISO 27001 Zertifizierung', excerpt: 'Ein Meilenstein für unsere Datensicherheit: Wir sind offiziell zertifiziert und erfüllen höchste Standards.' },
  { date: '02. Aug 2025', category: 'Rechtliches', title: 'GoBD Updates 2025', excerpt: 'Was Sie über die neuen Anforderungen an die digitale Belegablage wissen müssen.' },
  { date: '20. Jul 2025', category: 'Produkt', title: 'Dark Mode ist da!', excerpt: 'Arbeiten Sie augenschonender mit unserem neuen Dark Mode für das Kanzlei-Dashboard.' }
];

export default function Blog() {
  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">Blog & Updates</h1>
              <p className="text-slate-500 dark:text-slate-400">Neuigkeiten aus der Produktentwicklung und Tipps für Steuerberater.</p>
            </div>
            <div className="flex gap-2">
              {['Alle', 'Produkt', 'Tutorials', 'Rechtliches'].map(tag => (
                <Button key={tag} variant="outline" size="sm" className="rounded-full">
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[400px] flex items-end group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-800 group-hover:scale-105 transition-transform duration-700"></div>

              <div className="relative z-20 p-8 md:p-12 max-w-3xl">
                <span className="text-primary-400 font-bold text-sm mb-2 block">{featuredPost.category} • {featuredPost.date}</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{featuredPost.title}</h2>
                <p className="text-slate-300 text-lg mb-6 line-clamp-2">{featuredPost.excerpt}</p>
                <span className="inline-flex items-center font-bold text-white group-hover:translate-x-2 transition-transform">
                  Beitrag lesen <ArrowRight size={18} className="ml-2" />
                </span>
              </div>
            </div>
          )}

          {/* Post Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {regularPosts.map((post, i) => (
              <article key={i} className="flex flex-col p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-800 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4 text-xs font-bold">
                  <span className="text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded">{post.category}</span>
                  <span className="text-slate-400">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{post.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 flex-grow">{post.excerpt}</p>
                <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center group-hover:translate-x-1 transition-transform">Mehr erfahren <ArrowRight size={16} className="ml-1" /></span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
