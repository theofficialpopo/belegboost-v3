'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Etwas ist schiefgelaufen</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Ein unerwarteter Fehler ist aufgetreten. Wir wurden benachrichtigt.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={this.handleReload} variant="primary">
                Seite neu laden
              </Button>
              <Button onClick={this.handleGoHome} variant="outline">
                Zur Startseite
              </Button>
            </div>
            {this.state.error && (
              <div className="mt-8 text-left bg-slate-100 dark:bg-slate-950 p-4 rounded-lg overflow-auto max-h-40 text-xs font-mono text-slate-500">
                {this.state.error.toString()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
