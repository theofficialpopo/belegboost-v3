import Settings from '@/components/dashboard/views/Settings';
import { notFound } from 'next/navigation';
import { getOrganizationBySlug } from '@/lib/db-helpers';

export const metadata = {
  title: 'Einstellungen - BelegBoost Dashboard',
  description: 'Konfigurieren Sie Ihre DATEV-Export-Einstellungen.',
};

interface SettingsPageProps {
  params: Promise<{ slug: string }>;
}

// Mock organization for demo mode
const demoOrganization = {
  id: 'demo-org-id',
  name: 'Demo Steuerberatung',
  subdomain: 'demo',
  email: 'demo@belegboost.de',
  plan: 'professional' as const,
  settings: {
    theme: 'emerald' as const,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { slug } = await params;

  // Use mock data for demo mode
  if (slug === 'demo') {
    return <Settings organization={demoOrganization} />;
  }

  // Use the db-helper that validates slug input
  const org = await getOrganizationBySlug(slug);

  // Return 404 if organization not found
  if (!org) {
    notFound();
  }

  return <Settings organization={org} />;
}
