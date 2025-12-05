'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '../ui/Button';
import AuthLayout from './AuthLayout';
import { Mail, Lock, User, Building, Globe, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import IconInput from '../ui/IconInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSlug } from '../../lib/utils';
import { registerSchema, type RegisterFormData } from '../../lib/validations/auth';
import { logError } from '@/lib/logger';

// Use shared validation schema
const signUpSchema = registerSchema;
type SignUpFormData = RegisterFormData;

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Form setup - use combined schema, step-based validation via trigger()
  const { register, handleSubmit, watch, trigger, setValue, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      companyName: '',
      subdomain: ''
    }
  });

  const companyName = watch('companyName');
  const subdomain = watch('subdomain');

  // Auto-generate subdomain from company name
  useEffect(() => {
    if (step === 2 && companyName && !subdomain) {
      const slug = generateSlug(companyName);
      setValue('subdomain', slug, { shouldValidate: true });
    }
  }, [companyName, step, setValue, subdomain]);

  // Check subdomain availability
  useEffect(() => {
    if (step === 2 && subdomain && !errors.subdomain) {
      setSubdomainStatus('checking');
      // In production, this would be an actual API call
      setSubdomainStatus(subdomain === 'test' ? 'taken' : 'available');
    } else {
      setSubdomainStatus('idle');
    }
  }, [subdomain, step, errors.subdomain]);

  const onStep1Submit = async () => {
    const isValid = await trigger(['name', 'email', 'password']);
    if (isValid) {
      setStep(2);
    }
  };

  const onFinalSubmit = async (data: SignUpFormData) => {
    if (subdomainStatus === 'taken') return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          companyName: data.companyName,
          subdomain: data.subdomain,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific field errors
        if (result.field === 'subdomain') {
          setSubdomainStatus('taken');
          setError(result.error || 'Subdomain is already taken');
        } else if (result.field === 'email') {
          setError(result.error || 'Email is already registered');
          setStep(1); // Go back to step 1 for email error
        } else {
          setError(result.error || 'Registration failed. Please try again.');
        }
        return;
      }

      // Success - redirect to login page
      router.push('/login?registered=true');
    } catch (err) {
      logError('Registration error', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      router.push('/');
    } else {
      setStep(1);
    }
  };

  return (
    <AuthLayout
      title={step === 1 ? "Account erstellen" : "Kanzlei einrichten"}
      subtitle={step === 1 ? "Starten Sie Ihre 14-tägige Testphase." : "Richten Sie Ihren persönlichen Workspace ein."}
      backHref={step === 1 ? '/' : undefined}
      backLabel={step === 1 ? 'Zurück zur Startseite' : 'Zurück zu Schritt 1'}
    >
      <div className="flex items-center gap-2 mb-8">
        <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
        <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-2">
          <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

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

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={handleBack} disabled={loading} className="rounded-xl py-3">
                Zurück
              </Button>
              <Button type="submit" fullWidth disabled={subdomainStatus === 'taken' || loading} className="rounded-xl py-3 shadow-lg shadow-primary-500/20">
                {loading ? <Loader2 className="animate-spin" /> : 'Account erstellen'}
              </Button>
            </div>
          </div>
        )}
      </form>

      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Bereits registriert?{' '}
          <Link
            href="/login"
            className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
          >
            Anmelden
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
