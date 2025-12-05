
import React from 'react';
import { CheckCircle2, AlertCircle, Clock, FileSpreadsheet } from 'lucide-react';

export interface Submission {
  id: string;
  clientName: string;
  clientNumber: string;
  provider: string;
  providerLogo: string; // Initials or short code
  period: string;
  receivedAt: string;
  transactionCount: number;
  status: 'new' | 'exported' | 'review';
  endBalance: string;
  assignedAdvisor: string; // The advisor selected by the client
  datevAccount?: string; // The DATEV account number (e.g. 1200) entered by advisor
}

export interface TeamMember {
  id: string;
  name: string;
  jobTitle: string; // e.g. "Steuerfachwirtin"
  role: 'owner' | 'admin' | 'member'; // System permission level
  email: string;
  avatar: string;
  status: 'active' | 'invited';
  isPubliclyVisible: boolean; // Determines if they appear in the portal
}

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
    period: '15.10.2025 - 05.11.2025', // Cross-month range to test "10. - 11.2025" format
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

export const getStatusConfig = (status: Submission['status']) => {
    switch (status) {
        case 'new': return { label: 'Neu', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: CheckCircle2 };
        case 'review': return { label: 'Prüfung', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: AlertCircle };
        case 'exported': return { label: 'Exportiert', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: FileSpreadsheet };
        default: return { label: 'Unbekannt', color: 'bg-slate-100 text-slate-700', icon: Clock };
    }
};
