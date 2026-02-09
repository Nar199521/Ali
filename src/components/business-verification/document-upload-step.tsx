'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VerificationData } from '@/app/business-verification/page';

interface DocumentUploadStepProps {
  onNext: () => void;
  onBack: () => void;
  data: Partial<VerificationData>;
  updateData: (data: Partial<VerificationData>) => void;
}

export function DocumentUploadStep({ onNext, onBack, data, updateData }: DocumentUploadStepProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof VerificationData) => {
    if (e.target.files) {
      updateData({ [field]: e.target.files[0] });
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">Document Upload</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="certificate">Certificate of Incorporation</Label>
          <Input id="certificate" type="file" onChange={(e) => handleFileChange(e, 'certificate')} />
        </div>
        <div>
          <Label htmlFor="taxId">Proof of Tax ID</Label>
          <Input id="taxId" type="file" onChange={(e) => handleFileChange(e, 'taxId')} />
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
