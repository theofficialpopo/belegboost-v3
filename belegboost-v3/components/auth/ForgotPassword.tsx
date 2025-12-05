'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import AuthLayout from './AuthLayout';
import IconInput from '../ui/IconInput';
import { Mail, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setIsSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <AuthLayout
        title="E-Mail versendet"
        subtitle="Wir haben Ihnen einen Link zum Zurücksetzen gesendet."
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Bitte überprüfen Sie Ihren Posteingang (und Spam-Ordner). Der Link ist 1 Stunde gültig.
          </p>
          <Link href="/login">
            <Button fullWidth>
              Zurück zur Anmeldung
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Passwort vergessen?"
      subtitle="Kein Problem. Geben Sie Ihre E-Mail ein."
      backHref="/login"
      backLabel="Zurück zur Anmeldung"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <IconInput
          label="E-Mail Adresse"
          icon={Mail}
          type="email"
          placeholder="name@kanzlei.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button
          fullWidth
          type="submit"
          disabled={isLoading}
          className="mt-2 rounded-xl py-3 shadow-lg shadow-primary-500/20"
        >
          {isLoading ? 'Wird gesendet...' : 'Reset-Link senden'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
