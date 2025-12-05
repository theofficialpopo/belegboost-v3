import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export const metadata = {
  title: "Demo Dashboard - BelegBoost",
  description: "Demo-Modus: Verwalten Sie Ihre Belege und Mandanten.",
};

export default function DemoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No ProtectedRoute - demo mode is open to everyone
  return (
    <ErrorBoundary>
      <DashboardLayout>{children}</DashboardLayout>
    </ErrorBoundary>
  );
}
