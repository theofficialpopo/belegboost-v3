'use client';

import AdvisorPortal from '@/components/portal/AdvisorPortal';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useOrganization } from '@/lib/OrganizationContext';

export default function ProductionPortalPage() {
  const { organization } = useOrganization();
  const isDemoMode = organization.subdomain === 'demo';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Organization/Demo banner */}
        {isDemoMode ? (
          <div className="bg-amber-500 text-white py-2 px-4 text-center text-sm font-medium">
            Demo-Modus – Keine echten Daten werden gespeichert
          </div>
        ) : (
          <div className="bg-primary-600 text-white py-2 px-4 text-center text-sm">
            Portal für <strong>{organization.name}</strong>
          </div>
        )}
        <AdvisorPortal organization={organization} />
      </div>
    </ErrorBoundary>
  );
}
