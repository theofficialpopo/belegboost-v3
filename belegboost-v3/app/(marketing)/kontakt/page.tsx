'use client';

import PageWrapper from "@/components/landing/ui/PageWrapper";
import Button from "@/components/ui/Button";
import { MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Danke für Ihre Nachricht!");
  };

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Left Column - Info */}
          <div>
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Kontaktieren Sie uns</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
              Haben Sie Fragen zu unserem Produkt oder benötigen Sie Unterstützung? Unser Team ist für Sie da.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-2xl shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Anschrift</h4>
                  <p className="text-slate-600 dark:text-slate-400">BelegBoost GmbH<br />Musterstraße 111<br />80331 München</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">E-Mail</h4>
                  <p className="text-slate-600 dark:text-slate-400">kontakt@belegboost.de<br />support@belegboost.de</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-2xl shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Telefon</h4>
                  <p className="text-slate-600 dark:text-slate-400">+49 (0) 89 12345678<br />Mo-Fr 09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Nachricht senden</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Firma</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="Firma GmbH"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">E-Mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-900 dark:text-white"
                  placeholder="ihre@email.de"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Nachricht</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-32 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none text-slate-900 dark:text-white"
                  placeholder="Wie können wir helfen?"
                />
              </div>
              <Button fullWidth className="py-4 rounded-xl text-lg">Nachricht senden</Button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
