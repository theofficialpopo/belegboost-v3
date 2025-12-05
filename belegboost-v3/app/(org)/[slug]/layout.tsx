import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { organizations } from '@/db/schema';
import { OrganizationProvider, Organization } from '@/lib/OrganizationContext';
import { DemoModeProvider } from '@/lib/DemoModeContext';

interface OrgLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

// Mock organization for demo mode
const demoOrganization: Organization = {
  id: 'demo-org-id',
  name: 'Demo Steuerberatung',
  subdomain: 'demo',
  email: 'demo@belegboost.de',
  plan: 'professional',
  settings: {
    theme: 'emerald' as const,
  },
};

async function getOrganization(slug: string): Promise<Organization | null> {
  // Return mock data for demo mode
  if (slug === 'demo') {
    return demoOrganization;
  }

  const org = await db.query.organizations.findFirst({
    where: eq(organizations.subdomain, slug),
  });

  if (!org) return null;

  return {
    id: org.id,
    name: org.name,
    subdomain: org.subdomain,
    email: org.email,
    plan: org.plan,
    settings: (org.settings as Organization['settings']) || {},
  };
}

export default async function OrgLayout({ children, params }: OrgLayoutProps) {
  const { slug } = await params;
  const isDemoMode = slug === 'demo';

  // For demo mode, use mock data and wrap with DemoModeProvider
  if (isDemoMode) {
    return (
      <DemoModeProvider>
        <OrganizationProvider organization={demoOrganization}>
          {/* Demo mode banner */}
          <div className="bg-amber-500 text-white text-center py-2 px-4 text-sm font-medium">
            Demo-Modus – Keine echten Daten werden gespeichert
          </div>
          {children}
        </OrganizationProvider>
      </DemoModeProvider>
    );
  }

  // For production mode, fetch from database
  const organization = await getOrganization(slug);

  if (!organization) {
    notFound();
  }

  return (
    <OrganizationProvider organization={organization}>
      {children}
    </OrganizationProvider>
  );
}
