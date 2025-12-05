import Team from "@/components/dashboard/views/Team";
import { TEAM_MEMBERS } from "@/lib/data";

export const metadata = {
  title: "Team - BelegBoost Dashboard",
  description: "Verwalten Sie Zugriffsrechte und Mitarbeiter.",
};

// Convert mock data to match DB schema format
const mockTeamMembers = TEAM_MEMBERS.map((member) => ({
  id: member.id,
  organizationId: "demo-org-id",
  name: member.name,
  jobTitle: member.jobTitle,
  role: member.role as "owner" | "admin" | "member",
  email: member.email,
  avatar: member.avatar,
  status: member.status as "active" | "invited",
  isPubliclyVisible: member.isPubliclyVisible,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function TeamPage() {
  return <Team teamMembers={mockTeamMembers} />;
}
