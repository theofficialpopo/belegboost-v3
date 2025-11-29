import React, { useState } from 'react';
import Button from '../ui/Button';
import AuthLayout from './AuthLayout';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = () => {
    // TODO: Backend - Implement logic to send password reset email
    setIsSent(true);
  };

  if (isSent) {
    return (
        <AuthLayout 
            title="E-Mail versendet" 
            subtitle="Wir haben Ihnen einen Link zum Zurücksetzen gesendet."
            onBack={() => navigate('/')}
        >
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                    Bitte überprüfen Sie Ihren Posteingang (und Spam-Ordner). Der Link ist 1 Stunde gültig.
                </p>
                <Button fullWidth onClick={() => navigate('/login')}>
                    Zurück zur Anmeldung
                </Button>
            </div>
        </AuthLayout>
    );
  }

  return (
    <AuthLayout 
        title="Passwort vergessen?" 
        subtitle="Kein Problem. Geben Sie Ihre E-Mail ein."
        onBack={() => navigate('/login')}
    >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">E-Mail Adresse</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail size={18} />
                    </div>
                    <input 
                        type="email" 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                        placeholder="name@kanzlei.de"
                    />
                </div>
            </div>

            <Button fullWidth onClick={handleSubmit} className="mt-2 rounded-xl py-3 shadow-lg shadow-primary-500/20">
                Reset-Link senden
            </Button>
        </form>
    </AuthLayout>
  );
};

export default ForgotPassword;