import type { LucideIcon } from 'lucide-react';
import { SUBMISSION_STATUS, TEAM_ROLES } from '../constants';

// --- Enums & Derived Types ---
// Derive types directly from the runtime constants to ensure they never drift apart
export type SubmissionStatus = typeof SUBMISSION_STATUS[keyof typeof SUBMISSION_STATUS];
export type TeamRole = typeof TEAM_ROLES[keyof typeof TEAM_ROLES];

// --- Auth & User Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatar?: string;
  companyName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// --- Toast Types ---
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

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

// Button variant type - exported for reuse
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';

export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant: ButtonVariant;
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
  providerLogo: string;
  period: string;
  receivedAt: string;
  transactionCount: number;
  status: SubmissionStatus;
  endBalance: string;
  assignedAdvisor: string;
  datevAccount?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  jobTitle: string;
  role: TeamRole;
  email: string;
  avatar: string;
  status: 'active' | 'invited';
  isPubliclyVisible: boolean;
}

// --- Location State Types (for navigation) ---
export interface LocationState {
  from?: {
    pathname: string;
  };
}
