import Overview from "@/components/dashboard/views/Overview";
import { SUBMISSIONS } from "@/lib/data";

export const metadata = {
  title: "Übersicht - BelegBoost Dashboard",
  description: "Verwalten Sie eingehende Beleg-Exporte Ihrer Mandanten.",
};

export default function OverviewPage() {
  return <Overview submissions={SUBMISSIONS} />;
}
