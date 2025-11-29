
import { useState } from 'react';
import { PortalFormData } from '../types';

export function usePortalForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<PortalFormData>({
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
  });

  const totalSteps = 4;

  const updateData = (data: Partial<PortalFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      submit();
    }
  };

  const prevStep = (onExit?: () => void) => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else if (onExit) {
      onExit();
    }
  };

  const submit = () => {
    // TODO: Backend integration
    console.log("Submitting Portal Data:", formData);
    setIsSuccess(true);
  };

  const restart = () => {
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
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.companyName && !!formData.email;
      case 2: return !!formData.dataFile && !!formData.provider;
      case 3: return !!formData.startDate && !!formData.endDate && !!formData.endBalance;
      case 4: return !!formData.selectedAdvisor;
      default: return false;
    }
  };

  return {
    currentStep,
    totalSteps,
    formData,
    updateData,
    nextStep,
    prevStep,
    isSuccess,
    restart,
    canProceed
  };
}
