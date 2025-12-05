import Settings from '@/components/dashboard/views/Settings';
import { db } from '@/db';
import { organizations } from '@/db/schema/organizations';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Einstellungen - BelegBoost Dashboard',
  description: 'Konfigurieren Sie Ihre DATEV-Export-Einstellungen.',
};

interface SettingsPageProps {
  params: {
    slug: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { slug } = params;

  // Fetch organization data from database
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.subdomain, slug),
  });

  // Return 404 if organization not found
  if (!org) {
    notFound();
  }

  return <Settings organization={org} />;
}
