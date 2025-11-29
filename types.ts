import { LucideIcon } from 'lucide-react';

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

// Portal Types

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