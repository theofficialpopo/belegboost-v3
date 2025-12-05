import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export const metadata = {
  title: 'Dashboard - BelegBoost',
  description: 'Verwalten Sie Ihre Belege und Mandanten.',
};

export default function ProductionDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth is handled by middleware - if we get here, user is authenticated
  return (
    <ErrorBoundary>
      <DashboardLayout>{children}</DashboardLayout>
    </ErrorBoundary>
  );
}
