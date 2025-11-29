import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import AuthLayout from './AuthLayout';
import { Mail, Lock, User, Building, Globe, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import IconInput from '../ui/IconInput';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define schemas for each step
const step1Schema = z.object({
    name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein."),
    email: z.string().email("Ungültige E-Mail-Adresse."),
    password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein."),
});

const step2Schema = z.object({
    companyName: z.string().min(2, "Firmenname ist erforderlich."),
    subdomain: z.string()
        .min(3, "Subdomain muss mindestens 3 Zeichen lang sein.")
        .regex(/^[a-z0-9-]+$/, "Nur Kleinbuchstaben, Zahlen und Bindestriche erlaubt."),
});

// Combined schema for type inference
const signUpSchema = step1Schema.merge(step2Schema);
type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  
  // Form setup
  const { register, handleSubmit, watch, trigger, setValue, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
    mode: 'onChange'
  });

  const companyName = watch('companyName');
  const subdomain = watch('subdomain');

  // Auto-generate subdomain from company name
  useEffect(() => {
    if (step === 2 && companyName && !subdomain) {
      const slug = companyName
        .toLowerCase()
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      setValue('subdomain', slug, { shouldValidate: true });
    }
  }, [companyName, step, setValue, subdomain]);

  // Check subdomain availability
  useEffect(() => {
    if (step === 2 && subdomain && !errors.subdomain) {
      setSubdomainStatus('checking');
      const timer = setTimeout(() => {
        setSubdomainStatus(subdomain === 'test' ? 'taken' : 'available');
      }, 600);
      return () => clearTimeout(timer);
    } else {
        setSubdomainStatus('idle');
    }
  }, [subdomain, step, errors.subdomain]);

  const onStep1Submit = async () => {
    const isValid = await trigger(['name', 'email', 'password']);
    if (isValid) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 400);
    }
  };

  const onFinalSubmit = (data: SignUpFormData) => {
    if (subdomainStatus === 'taken') return;
    console.log('Registering:', data);
    // Here you would call your API registration
  };

  return (
    <AuthLayout 
        title={step === 1 ? "Account erstellen" : "Kanzlei einrichten"}
        subtitle={step === 1 ? "Starten Sie Ihre 14-tägige Testphase." : "Richten Sie Ihren persönlichen Workspace ein."}
        onBack={() => step === 1 ? navigate('/') : setStep(1)}
    >
        <div className="flex items-center gap-2 mb-8">
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onFinalSubmit)}>
            {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                    <IconInput
                        label="Vollständiger Name"
                        icon={User}
                        placeholder="Max Mustermann"
                        autoFocus
                        error={errors.name?.message}
                        {...register('name')}
                    />
                    <IconInput
                        label="E-Mail Adresse"
                        icon={Mail}
                        type="email"
                        placeholder="name@kanzlei.de"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                    <IconInput
                        label="Passwort"
                        icon={Lock}
                        type="password"
                        placeholder="Mindestens 8 Zeichen"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                    <Button type="button" fullWidth onClick={onStep1Submit} className="mt-4 rounded-xl py-3 shadow-lg shadow-primary-500/20">
                        {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center">Weiter <ArrowRight size={16} className="ml-2" /></span>}
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                    <IconInput
                        label="Name der Kanzlei / Firma"
                        icon={Building}
                        placeholder="Müller & Partner"
                        autoFocus
                        error={errors.companyName?.message}
                        {...register('companyName')}
                    />
                    
                    <div>
                        <IconInput
                            label="Ihre persönliche URL (Subdomain)"
                            icon={Globe}
                            placeholder="kanzlei-mueller"
                            rightElement={<span className="text-slate-400 text-sm font-medium">.belegboost.de</span>}
                            className={
                                subdomainStatus === 'available' ? 'border-green-300 focus:ring-green-500' :
                                subdomainStatus === 'taken' ? 'border-red-300 focus:ring-red-500' : ''
                            }
                            error={errors.subdomain?.message}
                            {...register('subdomain')}
                            onChange={(e) => {
                                // Allow only valid characters
                                e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                                register('subdomain').onChange(e);
                            }}
                        />
                        <div className="mt-2 min-h-[20px] text-xs flex items-center gap-1.5">
                             {subdomain && !errors.subdomain && (
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

                    <Button type="submit" fullWidth disabled={subdomainStatus === 'taken'} className="mt-4 rounded-xl py-3 shadow-lg shadow-primary-500/20">
                        Account erstellen
                    </Button>
                </div>
            )}
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Bereits registriert?{' '}
                <button 
                    onClick={() => navigate('/login')}
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