import Team from '@/components/dashboard/views/Team';
import { TEAM_MEMBERS } from '@/lib/data';
import { getOrganizationIdBySlug, getTeamMembersForOrg } from '@/lib/db-helpers';

export const metadata = {
  title: 'Team - BelegBoost Dashboard',
  description: 'Verwalten Sie Ihr Team und Zugriffsrechte.',
};

interface TeamPageProps {
  params: Promise<{ slug: string }>;
}

async function getTeamMembers(organizationId: string) {
  // Use the org-scoped helper that enforces multi-tenant isolation
  return getTeamMembersForOrg(organizationId);
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;

  // Use mock data for demo mode
  if (slug === 'demo') {
    const mockTeamMembers = TEAM_MEMBERS.map((member) => ({
      id: member.id,
      organizationId: 'demo-org-id',
      name: member.name,
      jobTitle: member.jobTitle,
      role: member.role as 'owner' | 'admin' | 'member',
      email: member.email,
      avatar: member.avatar,
      status: member.status as 'active' | 'invited',
      isPubliclyVisible: member.isPubliclyVisible,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return <Team teamMembers={mockTeamMembers} />;
  }

  // Use the db-helper that validates organizationId
  const organizationId = await getOrganizationIdBySlug(slug);

  if (!organizationId) {
    throw new Error('Organization not found');
  }

  const teamMembersData = await getTeamMembers(organizationId);

  return <Team teamMembers={teamMembersData} />;
}
