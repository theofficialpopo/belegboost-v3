import React from 'react';
import Button from '../ui/Button';
import AuthLayout from './AuthLayout';
import { Mail, Lock } from 'lucide-react';
import IconInput from '../ui/IconInput';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Redirecting to Advisor Dashboard");
    navigate('/dashboard');
  };

  return (
    <AuthLayout 
        title="Willkommen zurück" 
        subtitle="Melden Sie sich an, um Ihre Exporte zu verwalten."
        onBack={() => navigate('/')}
    >
        <form className="space-y-4" onSubmit={handleSubmit}>
            <IconInput
                label="E-Mail Adresse"
                icon={Mail}
                type="email"
                placeholder="name@kanzlei.de"
                required
            />

            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Passwort</label>
                    <button 
                        type="button"
                        onClick={() => navigate('/forgot-password')} 
                        className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        Passwort vergessen?
                    </button>
                </div>
                <IconInput
                    icon={Lock}
                    type="password"
                    placeholder="••••••••"
                    required
                />
            </div>

            <Button fullWidth className="mt-2 rounded-xl py-3 shadow-lg shadow-primary-500/20">
                Anmelden
            </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Noch keinen Account?{' '}
                <button 
                    onClick={() => navigate('/signup')}
                    className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                >
                    Kostenlos registrieren
                </button>
            </p>
            <div className="mt-4">
               <button 
                    onClick={() => navigate('/portal')}
                    className="text-xs text-slate-400 hover:text-primary-500 transition-colors"
               >
                   (Demo: Zum Mandanten-Portal)
               </button>
            </div>
        </div>
    </AuthLayout>
  );
};

export default SignIn;