import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import AuthLayout from './AuthLayout';
import { Mail, Lock, User, Building, Globe, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import IconInput from '../ui/IconInput';

interface SignUpProps {
  onNavigate: (page: 'landing' | 'signin' | 'signup' | 'forgot-password') => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  
  const [personalData, setPersonalData] = useState({ name: '', email: '', password: '' });
  const [companyData, setCompanyData] = useState({ name: '', subdomain: '' });
  
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [isManuallyEdited, setIsManuallyEdited] = useState(false);

  useEffect(() => {
    if (step === 2 && !isManuallyEdited && companyData.name) {
      const slug = companyData.name
        .toLowerCase()
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      setCompanyData(prev => ({ ...prev, subdomain: slug }));
    }
  }, [companyData.name, step, isManuallyEdited]);

  useEffect(() => {
    if (step === 2 && companyData.subdomain) {
      setSubdomainStatus('checking');
      const timer = setTimeout(() => {
        setSubdomainStatus(companyData.subdomain === 'test' ? 'taken' : 'available');
      }, 600);
      return () => clearTimeout(timer);
    } else {
        setSubdomainStatus('idle');
    }
  }, [companyData.subdomain, step]);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setStep(2);
    }, 400);
  };

  const handleSubmit = () => {
    console.log('Registering:', { ...personalData, ...companyData });
  };

  return (
    <AuthLayout 
        title={step === 1 ? "Account erstellen" : "Kanzlei einrichten"}
        subtitle={step === 1 ? "Starten Sie Ihre 14-tägige Testphase." : "Richten Sie Ihren persönlichen Workspace ein."}
        onBack={() => step === 1 ? onNavigate('landing') : setStep(1)}
    >
        <div className="flex items-center gap-2 mb-8">
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                    <IconInput
                        label="Vollständiger Name"
                        icon={User}
                        value={personalData.name}
                        onChange={(e) => setPersonalData({...personalData, name: e.target.value})}
                        placeholder="Max Mustermann"
                        autoFocus
                    />
                    <IconInput
                        label="E-Mail Adresse"
                        icon={Mail}
                        type="email"
                        value={personalData.email}
                        onChange={(e) => setPersonalData({...personalData, email: e.target.value})} 
                        placeholder="name@kanzlei.de"
                    />
                    <IconInput
                        label="Passwort"
                        icon={Lock}
                        type="password"
                        value={personalData.password}
                        onChange={(e) => setPersonalData({...personalData, password: e.target.value})}
                        placeholder="Mindestens 8 Zeichen"
                    />
                    <Button fullWidth onClick={handleNext} className="mt-4 rounded-xl py-3 shadow-lg shadow-primary-500/20">
                        {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center">Weiter <ArrowRight size={16} className="ml-2" /></span>}
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                    <IconInput
                        label="Name der Kanzlei / Firma"
                        icon={Building}
                        value={companyData.name}
                        onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                        placeholder="Müller & Partner"
                        autoFocus
                    />
                    
                    <div>
                        <IconInput
                            label="Ihre persönliche URL (Subdomain)"
                            icon={Globe}
                            value={companyData.subdomain}
                            onChange={(e) => {
                                setCompanyData({...companyData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')});
                                setIsManuallyEdited(true);
                            }}
                            placeholder="kanzlei-mueller"
                            rightElement={<span className="text-slate-400 text-sm font-medium">.belegboost.de</span>}
                            className={
                                subdomainStatus === 'available' ? 'border-green-300 focus:ring-green-500' :
                                subdomainStatus === 'taken' ? 'border-red-300 focus:ring-red-500' : ''
                            }
                        />
                        <div className="mt-2 min-h-[20px] text-xs flex items-center gap-1.5">
                             {companyData.subdomain.length > 0 && (
                                <>
                                    {subdomainStatus === 'checking' && (
                                        <span className="text-slate-500 flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> Prüfe Verfügbarkeit...</span>
                                    )}
                                    {subdomainStatus === 'available' && (
                                        <span className="text-green-600 dark:text-green-400 flex items-center gap-1"><CheckCircle2 size={12} /> Verfügbar</span>
                                    )}
                                    {subdomainStatus === 'taken' && (
                                        <span className="text-red-500 flex items-center gap-1"><AlertCircle size={12} /> Leider bereits vergeben</span>
                                    )}
                                </>
                             )}
                        </div>
                    </div>

                    <Button fullWidth onClick={handleSubmit} disabled={subdomainStatus === 'taken' || !companyData.name} className="mt-4 rounded-xl py-3 shadow-lg shadow-primary-500/20">
                        Account erstellen
                    </Button>
                </div>
            )}
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Bereits registriert?{' '}
                <button 
                    onClick={() => onNavigate('signin')}
                    className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                >
                    Anmelden
                </button>
            </p>
        </div>
    </AuthLayout>
  );
};

export default SignUp;
