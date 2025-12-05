'use client';

import React, { createContext, useContext } from 'react';

export interface Organization {
  id: string;
  name: string;
  subdomain: string;
  email: string;
  plan: 'starter' | 'professional' | 'enterprise';
  settings: {
    theme?: string;
    logoUrl?: string;
    defaultDATEVAccount?: string;
  };
}

interface OrganizationContextType {
  organization: Organization;
  isLoading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

interface OrganizationProviderProps {
  children: React.ReactNode;
  organization: Organization;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({
  children,
  organization,
}) => {
  return (
    <OrganizationContext.Provider value={{ organization, isLoading: false }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = (): OrganizationContextType => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
