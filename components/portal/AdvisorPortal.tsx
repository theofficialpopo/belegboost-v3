import React from 'react';
import PortalLayout from './PortalLayout';
import Button from '../ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2, Upload } from 'lucide-react';
import IdentityStep from './steps/IdentityStep';
import SmartUploadStep from './steps/SmartUploadStep';
import PeriodBalanceStep from './steps/PeriodBalanceStep';
import AdvisorFinalizeStep from './steps/AdvisorFinalizeStep';
import { usePortalForm } from '../../lib/hooks';

interface AdvisorPortalProps {
  onNavigate: (page: 'landing') => void;
}

const AdvisorPortal: React.FC<AdvisorPortalProps> = ({ onNavigate }) => {
  const { 
    currentStep, 
    totalSteps, 
    formData, 
    updateData, 
    nextStep, 
    prevStep, 
    isSuccess, 
    restart, 
    canProceed 
  } = usePortalForm();

  const getStepTitle = (step: number) => {
      switch(step) {
          case 1: return 'Schritt 1: Identifikation';
          case 2: return 'Schritt 2: Datei-Upload';
          case 3: return 'Schritt 3: Zeitraum & Saldo';
          case 4: return 'Schritt 4: Abschluss';
          default: return '';
      }
  }

  if (isSuccess) {
    return (
      <PortalLayout>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center shadow-2xl animate-in zoom-in duration-500 border border-slate-100 dark:border-slate-800">
           <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
           </div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Upload erfolgreich!</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
             Vielen Dank. Die Daten von <strong>{formData.provider}</strong> wurden sicher an <strong>{formData.selectedAdvisor}</strong> übertragen. 
             Wir haben eine Bestätigung an {formData.email} gesendet.
           </p>
           <div className="flex justify-center gap-4">
               <Button onClick={restart} variant="outline">
                 Weitere Datei hochladen
               </Button>
               <Button onClick={() => onNavigate('landing')} variant="primary">
                 Zum Startbildschirm
               </Button>
           </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {getStepTitle(currentStep)}
            </h1>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {currentStep} / {totalSteps}
            </span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
                className="h-full bg-primary-500 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
        </div>
      </div>

      {/* Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 min-h-[500px] flex flex-col relative overflow-hidden transition-all duration-500">
        
        {/* Step Content */}
        <div className="flex-grow">
            {currentStep === 1 && <IdentityStep data={formData} updateData={updateData} onNext={nextStep} />}
            {currentStep === 2 && <SmartUploadStep data={formData} updateData={updateData} onFinish={nextStep} />}
            {currentStep === 3 && <PeriodBalanceStep data={formData} updateData={updateData} onNext={nextStep} />}
            {currentStep === 4 && <AdvisorFinalizeStep data={formData} updateData={updateData} onFinish={nextStep} />}
        </div>

        {/* Navigation Actions */}
        <div className="mt-8 flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800">
            {currentStep > 1 && (
                <button 
                    onClick={() => prevStep(() => onNavigate('landing'))}
                    className="flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium transition-colors"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Zurück
                </button>
            )}
            
            {/* Spacer for Step 1 if no back button */}
            {currentStep === 1 && <div></div>}
            
            <Button 
                onClick={nextStep} 
                disabled={!canProceed()}
                className={`rounded-full px-8 transition-all ${canProceed() ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-2 cursor-not-allowed'}`}
            >
                {currentStep === totalSteps ? (
                    <span className="flex items-center">Abschließen <Upload size={18} className="ml-2" /></span>
                ) : (
                    <span className="flex items-center">Weiter <ArrowRight size={18} className="ml-2" /></span>
                )}
            </Button>
        </div>
      </div>
    </PortalLayout>
  );
};

export default AdvisorPortal;
