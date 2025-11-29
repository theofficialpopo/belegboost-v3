import React from 'react';
import Button from '../ui/Button';
import { CheckCircle2 } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-bold mb-4">Preisgestaltung</h2>
                <p className="text-xl text-slate-500">Keine versteckten Kosten. Jederzeit kündbar.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-900 rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-slate-900 transition-all duration-300">
                    <h3 className="font-bold text-xl mb-2">Starter</h3>
                    <div className="text-4xl font-black mb-8">9€<span className="text-lg font-medium text-slate-400">/mo</span></div>
                    <ul className="space-y-4 mb-10 text-slate-600 dark:text-slate-400">
                        <li className="flex gap-2"><CheckCircle2 size={20} className="text-primary-500" /> 250 Belege</li>
                        <li className="flex gap-2"><CheckCircle2 size={20} className="text-primary-500" /> 1 User</li>
                    </ul>
                    <Button variant="outline" fullWidth className="rounded-full">Get Started</Button>
                </div>

                {/* Card 2 - Highlighted */}
                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[40px] p-10 shadow-2xl shadow-primary-500/20 transform md:-translate-y-4">
                    <div className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">MOST POPULAR</div>
                    <h3 className="font-bold text-xl mb-2">Professional</h3>
                    <div className="text-4xl font-black mb-8">29€<span className="text-lg font-medium opacity-60">/mo</span></div>
                    <ul className="space-y-4 mb-10 opacity-90">
                        <li className="flex gap-2"><CheckCircle2 size={20} className="text-primary-400 dark:text-primary-600" /> 2.500 Belege</li>
                        <li className="flex gap-2"><CheckCircle2 size={20} className="text-primary-400 dark:text-primary-600" /> 5 User</li>
                        <li className="flex gap-2"><CheckCircle2 size={20} className="text-primary-400 dark:text-primary-600" /> Priority Support</li>
                    </ul>
                    <Button variant="primary" fullWidth className="rounded-full bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-900 dark:text-white">Get Started</Button>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-slate-900 rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-slate-900 transition-all duration-300">
                    <h3 className="font-bold text-xl mb-2">Agency</h3>
                    <div className="text-4xl font-black mb-8">89€<span className="text-lg font-medium text-slate-400">/mo</span></div>
                    <ul className="space-y-4 mb-10 text-slate-600 dark:text-slate-400">
                        <li className="flex gap-2"><CheckCircle2 size={20} className="text-primary-500" /> Unlimitiert</li>
                        <li className="flex gap-2"><CheckCircle2 size={20} className="text-primary-500" /> API Access</li>
                    </ul>
                    <Button variant="outline" fullWidth className="rounded-full">Contact Sales</Button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Pricing;