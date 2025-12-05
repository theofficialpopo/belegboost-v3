'use client';

import { useState, useCallback } from 'react';
import type { PortalFormData } from '../types';
import type { Organization } from '@/lib/OrganizationContext';

const TOTAL_STEPS = 4;

const initialFormData: PortalFormData = {
  companyName: '',
  clientNumber: '',
  email: '',
  dataFile: null,
  pdfFile: null,
  provider: '',
  selectedAdvisor: '',
  startDate: '',
  endDate: '',
  endBalance: '',
};

export function usePortalForm(organization: Organization) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PortalFormData>(initialFormData);

  const updateData = useCallback((data: Partial<PortalFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const submit = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare FormData for API submission (multipart for file uploads)
      const submitData = new FormData();

      // Add organization ID
      submitData.append('organizationId', organization.id);

      // Add form fields
      submitData.append('companyName', formData.companyName);
      submitData.append('clientNumber', formData.clientNumber);
      submitData.append('email', formData.email);
      submitData.append('provider', formData.provider);
      submitData.append('startDate', formData.startDate);
      submitData.append('endDate', formData.endDate);
      submitData.append('endBalance', formData.endBalance);
      submitData.append('selectedAdvisor', formData.selectedAdvisor);

      // Add files if present
      if (formData.dataFile) {
        submitData.append('dataFile', formData.dataFile);
      }
      if (formData.pdfFile) {
        submitData.append('pdfFile', formData.pdfFile);
      }

      // Submit to API
      const response = await fetch('/api/portal/submit', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      const result = await response.json();
      console.log('Submission successful:', result);

      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [organization, formData, isSubmitting]);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      submit();
    }
  }, [currentStep, submit]);

  const prevStep = useCallback((onExit?: () => void) => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else if (onExit) {
      onExit();
    }
  }, [currentStep]);

  const restart = useCallback(() => {
    setIsSuccess(false);
    setCurrentStep(1);
    // Preserve identity
    setFormData(prev => ({
      ...prev,
      dataFile: null,
      pdfFile: null,
      provider: '',
      endBalance: '',
      startDate: '',
      endDate: '',
      selectedAdvisor: ''
    }));
  }, []);

  const canProceed = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.companyName && !!formData.email;
      case 2:
        return !!formData.dataFile && !!formData.provider;
      case 3:
        return !!formData.startDate && !!formData.endDate && !!formData.endBalance;
      case 4:
        return !!formData.selectedAdvisor;
      default:
        return false;
    }
  }, [currentStep, formData]);

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    updateData,
    nextStep,
    prevStep,
    isSuccess,
    isSubmitting,
    error,
    restart,
    canProceed
  };
}
