import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { organizations } from '@/db/schema';
import { OrganizationProvider, Organization } from '@/lib/OrganizationContext';

interface OrgLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

async function getOrganization(slug: string): Promise<Organization | null> {
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
