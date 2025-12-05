'use client';

import { DemoAuthProvider } from '@/lib/DemoAuthContext';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoAuthProvider>
      {/* Demo mode banner */}
      <div className="bg-amber-500 text-white text-center py-2 px-4 text-sm font-medium">
        Demo-Modus – Keine echten Daten werden gespeichert
      </div>
      {children}
    </DemoAuthProvider>
  );
}
