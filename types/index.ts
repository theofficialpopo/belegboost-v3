import { LucideIcon } from 'lucide-react';

// --- Landing Page Types ---
export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant: 'primary' | 'outline' | 'secondary';
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// --- Portal Types ---
export interface PortalFormData {
  // Step 1: Identity
  companyName: string;
  clientNumber: string;
  email: string;
  
  // Step 2: Data & Source
  dataFile: File | null;
  pdfFile: File | null;
  provider: string; // "Amex", "Wise", etc.
  
  // Step 3: Period & Balance
  startDate: string;
  endDate: string;
  endBalance: string;

  // Step 4: Advisor
  selectedAdvisor: string;
}

export interface Provider {
  name: string;
  logo: string;
  type: string;
}

export interface Advisor {
  name: string;
  role: string;
  initials: string;
}

// --- Dashboard Types ---
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
