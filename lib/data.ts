import { Submission, TeamMember, Provider, Advisor } from '../types';

export const PROVIDERS: Provider[] = [
  { name: 'American Express', logo: 'AM', type: 'Credit Card' },
  { name: 'Wise', logo: 'WI', type: 'Fintech' },
  { name: 'Revolut', logo: 'RE', type: 'Bank' },
  { name: 'PayPal', logo: 'PP', type: 'Fintech' },
  { name: 'Sparkasse', logo: 'SP', type: 'Bank' },
  { name: 'Deutsche Bank', logo: 'DB', type: 'Bank' },
  { name: 'Amazon Visa', logo: 'AZ', type: 'Credit Card' },
  { name: 'Miles & More', logo: 'MM', type: 'Credit Card' },
  { name: 'Stripe', logo: 'ST', type: 'Payment' },
  { name: 'Commerzbank', logo: 'CB', type: 'Bank' },
  { name: 'DKB', logo: 'DK', type: 'Bank' },
  { name: 'ING', logo: 'IN', type: 'Bank' },
];

export const ADVISORS: Advisor[] = [
  { name: "Dr. Stefan Weiss", role: "Partner / StB", initials: "SW" },
  { name: "Sabine Müller", role: "Steuerfachwirtin", initials: "SM" },
  { name: "Thomas Klein", role: "Bilanzbuchhalter", initials: "TK" },
  { name: "Lisa Weber", role: "Steuerfachangestellte", initials: "LW" },
  { name: "Michael Schmidt", role: "Steuerberater", initials: "MS" },
  { name: "Julia Franke", role: "Buchhaltung", initials: "JF" },
];

export const SUBMISSIONS: Submission[] = [
  {
    id: '1',
    clientName: 'Design Studio GmbH',
    clientNumber: '10492',
    provider: 'American Express',
    providerLogo: 'AM',
    period: '01.09.2025 - 30.09.2025',
    receivedAt: 'Gerade eben',
    transactionCount: 142,
    status: 'new',
    endBalance: '12.450,20 €',
    assignedAdvisor: 'SW',
    datevAccount: ''
  },
  {
    id: '2',
    clientName: 'TechStart Solutions',
    clientNumber: '10550',
    provider: 'Wise',
    providerLogo: 'WI',
    period: '01.08.2025 - 31.08.2025',
    receivedAt: 'Vor 2 Stunden',
    transactionCount: 89,
    status: 'new',
    endBalance: '4.230,00 €',
    assignedAdvisor: 'SM',
    datevAccount: '1210'
  },
  {
    id: '3',
    clientName: 'Müller Handwerk',
    clientNumber: '10200',
    provider: 'Sparkasse',
    providerLogo: 'SP',
    period: 'Q3 2025',
    receivedAt: 'Gestern',
    transactionCount: 450,
    status: 'review',
    endBalance: '89.100,50 €',
    assignedAdvisor: 'TK',
    datevAccount: ''
  },
  {
    id: '4',
    clientName: 'Global Trade Ltd.',
    clientNumber: '10600',
    provider: 'Revolut',
    providerLogo: 'RE',
    period: '01.09.2025 - 30.09.2025',
    receivedAt: 'Gestern',
    transactionCount: 32,
    status: 'exported',
    endBalance: '1.200,00 €',
    assignedAdvisor: 'SW',
    datevAccount: '1220'
  },
  {
    id: '5',
    clientName: 'Coffee & Co KG',
    clientNumber: '10110',
    provider: 'PayPal',
    providerLogo: 'PP',
    period: '01.08.2025 - 31.08.2025',
    receivedAt: '28.09.2025',
    transactionCount: 1205,
    status: 'exported',
    endBalance: '15.420,10 €',
    assignedAdvisor: 'SM',
    datevAccount: '1230'
  },
  {
    id: '6',
    clientName: 'Schmidt Consulting',
    clientNumber: '10880',
    provider: 'ING',
    providerLogo: 'IN',
    period: '15.10.2025 - 05.11.2025', 
    receivedAt: 'Heute, 09:30',
    transactionCount: 12,
    status: 'new',
    endBalance: '3.450,00 €',
    assignedAdvisor: 'LW',
    datevAccount: ''
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Stefan Weiss',
    jobTitle: 'Partner / StB',
    role: 'owner',
    email: 'stefan.weiss@kanzlei.de',
    avatar: 'SW',
    status: 'active',
    isPubliclyVisible: true
  },
  {
    id: '2',
    name: 'Sabine Müller',
    jobTitle: 'Steuerfachwirtin',
    role: 'admin',
    email: 'sabine.mueller@kanzlei.de',
    avatar: 'SM',
    status: 'active',
    isPubliclyVisible: true
  },
  {
    id: '3',
    name: 'Thomas Klein',
    jobTitle: 'Mitarbeiter',
    role: 'member',
    email: 'thomas.klein@kanzlei.de',
    avatar: 'TK',
    status: 'invited',
    isPubliclyVisible: false
  },
  {
    id: '4',
    name: 'Lisa Weber',
    jobTitle: 'Steuerfachangestellte',
    role: 'member',
    email: 'lisa.weber@kanzlei.de',
    avatar: 'LW',
    status: 'active',
    isPubliclyVisible: true
  }
];

// Helper to find advisor safely
export const getAdvisorById = (idOrInitials: string): TeamMember | undefined => {
    return TEAM_MEMBERS.find(m => m.id === idOrInitials || m.avatar === idOrInitials);
};