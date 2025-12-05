'use client';

import React from 'react';
import { Building, Mail, Hash } from 'lucide-react';
import { PortalFormData } from '../../../types';
import IconInput from '../../ui/IconInput';
import StepHeader from '../ui/StepHeader';

interface IdentityStepProps {
  data: PortalFormData;
  updateData: (data: Partial<PortalFormData>) => void;
  onNext: () => void;
}

const IdentityStep = ({ data, updateData, onNext }: IdentityStepProps) => {
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300">
      <StepHeader
        title="Willkommen im Mandanten-Portal"
        description="Bitte geben Sie Ihre Daten ein, um den Upload zu starten."
      />

      <div className="space-y-6">
        <IconInput
          label="Firma / Mandant"
          icon={Building}
          value={data.companyName}
          onChange={(e) => updateData({ companyName: e.target.value })}
          placeholder="Musterfirma GmbH"
          autoFocus
          className="py-4 text-lg"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IconInput
            label="E-Mail Adresse"
            icon={Mail}
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="buchhaltung@firma.de"
            className="py-4 text-lg"
          />

          <IconInput
            label="Mandantennummer (Optional)"
            icon={Hash}
            value={data.clientNumber}
            onChange={(e) => updateData({ clientNumber: e.target.value })}
            placeholder="10000"
            className="py-4 text-lg"
            onKeyDown={(e) => e.key === 'Enter' && data.companyName && data.email && onNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default IdentityStep;
