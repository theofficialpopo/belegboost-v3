'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '../ui/Button';
import AuthLayout from './AuthLayout';
import { Mail, Lock, Loader2 } from 'lucide-react';
import IconInput from '../ui/IconInput';
import { useAuth } from '../../lib/AuthContext';
import { useToast } from '../../lib/ToastContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  password: z.string().min(1, "Passwort ist erforderlich."),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    try {
      const result = await login(data.email, data.password);

      if (result.error) {
        addToast({
          type: 'error',
          title: 'Fehler bei der Anmeldung',
          message: result.error
        });
        return;
      }

      addToast({
        type: 'success',
        title: 'Willkommen zurück!',
        message: 'Sie haben sich erfolgreich angemeldet.'
      });

      // Redirect to where they wanted to go, or let middleware handle it
      const from = searchParams.get('from');
      if (from && from.startsWith('/') && !from.startsWith('//')) {
        router.push(from);
      } else {
        // Refresh to let middleware redirect to org dashboard
        router.refresh();
        // Give time for session to update
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    } catch {
      addToast({
        type: 'error',
        title: 'Fehler bei der Anmeldung',
        message: 'Ein unerwarteter Fehler ist aufgetreten.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Willkommen zurück"
      subtitle="Melden Sie sich an, um Ihre Exporte zu verwalten."
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <IconInput
          label="E-Mail Adresse"
          icon={Mail}
          type="email"
          placeholder="name@kanzlei.de"
          error={errors.email?.message}
          {...register('email')}
        />

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Passwort</label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              Passwort vergessen?
            </Link>
          </div>
          <IconInput
            icon={Lock}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <Button type="submit" fullWidth disabled={isLoading} className="mt-2 rounded-xl py-3 shadow-lg shadow-primary-500/20">
          {isLoading ? <Loader2 className="animate-spin" /> : 'Anmelden'}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Noch keinen Account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
          >
            Kostenlos registrieren
          </Link>
        </p>
        <div className="mt-4">
          <Link
            href="/portal"
            className="text-xs text-slate-400 hover:text-primary-500 transition-colors"
          >
            (Demo: Zum Mandanten-Portal)
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
