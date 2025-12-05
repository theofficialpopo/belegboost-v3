import Team from '@/components/dashboard/views/Team';
import { db } from '@/db';
import { teamMembers, organizations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const metadata = {
  title: 'Team - BelegBoost Dashboard',
  description: 'Verwalten Sie Ihr Team und Zugriffsrechte.',
};

interface TeamPageProps {
  params: Promise<{ slug: string }>;
}

async function getTeamMembers(slug: string) {
  // First get the organization ID from the slug
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.subdomain, slug),
  });

  if (!org) {
    throw new Error('Organization not found');
  }

  // Then fetch team members for this organization
  const members = await db.query.teamMembers.findMany({
    where: eq(teamMembers.organizationId, org.id),
    orderBy: (teamMembers, { asc }) => [asc(teamMembers.createdAt)],
  });

  return members;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;
  const teamMembersData = await getTeamMembers(slug);

  return <Team teamMembers={teamMembersData} />;
}
