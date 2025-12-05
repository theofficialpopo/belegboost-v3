import Overview from '@/components/dashboard/views/Overview';
import { notFound } from 'next/navigation';
import { SUBMISSIONS } from '@/lib/data';
import { getOrganizationIdBySlug, getSubmissionsForOrg } from '@/lib/db-helpers';

export const metadata = {
  title: 'Übersicht - BelegBoost Dashboard',
  description: 'Verwalten Sie eingehende Beleg-Exporte Ihrer Mandanten.',
};

interface OverviewPageProps {
  params: Promise<{ slug: string }>;
}

async function getSubmissions(organizationId: string) {
  // Use the org-scoped helper that enforces multi-tenant isolation
  const data = await getSubmissionsForOrg(organizationId, {
    includeTeamMember: true,
  });

  // Transform DB data to match frontend Submission type
  return data.map((sub) => ({
    id: sub.id,
    clientName: sub.clientName,
    clientNumber: sub.clientNumber,
    clientEmail: sub.clientEmail,
    provider: sub.provider,
    providerLogo: sub.providerLogo,
    dateFrom: sub.dateFrom,
    dateTo: sub.dateTo,
    period: `${formatDate(sub.dateFrom)} - ${formatDate(sub.dateTo)}`,
    receivedAt: sub.receivedAt,
    transactionCount: sub.transactionCount,
    status: sub.status,
    endBalance: sub.endBalance,
    assignedAdvisor: sub.teamMember?.name || null,
    datevAccount: sub.datevAccount,
  }));
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export default async function OverviewPage({ params }: OverviewPageProps) {
  const { slug } = await params;

  // Use mock data for demo mode
  if (slug === 'demo') {
    return <Overview submissions={SUBMISSIONS} />;
  }

  // Use the db-helper that validates organizationId
  const organizationId = await getOrganizationIdBySlug(slug);

  if (!organizationId) {
    notFound();
  }

  const submissionsData = await getSubmissions(organizationId);

  return <Overview submissions={submissionsData} />;
}
