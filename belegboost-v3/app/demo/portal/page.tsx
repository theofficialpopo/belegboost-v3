'use client';

import AdvisorPortal from "@/components/portal/AdvisorPortal";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import type { Organization } from "@/lib/OrganizationContext";

// Mock organization for demo purposes
const demoOrganization: Organization = {
  id: 'demo-org-id',
  name: 'Demo Steuerberatung',
  subdomain: 'demo',
  email: 'demo@belegboost.de',
  plan: 'professional',
  settings: {
    theme: 'emerald',
  },
};

export default function DemoPortalPage() {
  return (
    <ErrorBoundary>
      <AdvisorPortal organization={demoOrganization} />
    </ErrorBoundary>
  );
}
