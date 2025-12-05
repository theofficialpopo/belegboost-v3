import { eq, desc } from 'drizzle-orm';
import { db } from '@/db';
import { submissions } from '@/db/schema';
import Overview from '@/components/dashboard/views/Overview';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Übersicht - BelegBoost Dashboard',
  description: 'Verwalten Sie eingehende Beleg-Exporte Ihrer Mandanten.',
};

interface OverviewPageProps {
  params: Promise<{ slug: string }>;
}

async function getOrganizationId(slug: string): Promise<string | null> {
  const org = await db.query.organizations.findFirst({
    where: (organizations, { eq }) => eq(organizations.subdomain, slug),
    columns: { id: true },
  });
  return org?.id || null;
}

async function getSubmissions(organizationId: string) {
  const data = await db.query.submissions.findMany({
    where: eq(submissions.organizationId, organizationId),
    orderBy: desc(submissions.receivedAt),
    with: {
      teamMember: true,
    },
  });

  // Transform DB data to match frontend Submission type
  return data.map((sub) => ({
    id: sub.id,
    clientName: sub.clientName,
    clientNumber: sub.clientNumber || '',
    provider: sub.provider,
    providerLogo: sub.providerLogo || '',
    period: `${formatDate(sub.dateFrom)} - ${formatDate(sub.dateTo)}`,
    receivedAt: formatDate(sub.receivedAt),
    transactionCount: sub.transactionCount || 0,
    status: sub.status,
    endBalance: sub.endBalance || '0.00',
    assignedAdvisor: sub.teamMember?.name || 'Nicht zugewiesen',
    datevAccount: sub.datevAccount || undefined,
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
  const organizationId = await getOrganizationId(slug);

  if (!organizationId) {
    notFound();
  }

  const submissionsData = await getSubmissions(organizationId);

  return <Overview submissions={submissionsData} />;
}
