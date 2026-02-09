'use client';

import { useState } from 'react';
import { Stepper } from '@/components/ui/stepper';
import { BusinessInfoStep } from '@/components/business-verification/business-info-step';
import { DocumentUploadStep } from '@/components/business-verification/document-upload-step';
import { ReviewStep } from '@/components/business-verification/review-step';

const steps = [
  { label: 'Business Information' },
  { label: 'Document Upload' },
  { label: 'Review & Submit' },
];

export interface VerificationData {
  companyName: string;
  registrationNumber: string;
  address: string;
  certificate: File | null;
  taxId: File | null;
}

export default function BusinessVerificationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationData, setVerificationData] = useState<VerificationData>({
    companyName: '',
    registrationNumber: '',
    address: '',
    certificate: null,
    taxId: null,
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateVerificationData = (data: Partial<VerificationData>) => {
    setVerificationData((prev) => ({ ...prev, ...data }));
  };


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessInfoStep onNext={handleNext} data={verificationData} updateData={updateVerificationData} />;
      case 1:
        return <DocumentUploadStep onNext={handleNext} onBack={handleBack} data={verificationData} updateData={updateVerificationData} />;
      case 2:
        return <ReviewStep onBack={handleBack} data={verificationData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Stepper currentStep={currentStep} steps={steps} />
      <div className="mt-8">{renderStep()}</div>
    </div>
  );
}
