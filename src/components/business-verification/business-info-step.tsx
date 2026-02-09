'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VerificationData } from '@/app/business-verification/page';

interface BusinessInfoStepProps {
  onNext: () => void;
  data: Partial<VerificationData>;
  updateData: (data: Partial<VerificationData>) => void;
}

export function BusinessInfoStep({ onNext, data, updateData }: BusinessInfoStepProps) {
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">Business Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Enter your company name"
            value={data.companyName || ''}
            onChange={(e) => updateData({ companyName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="registrationNumber">Business Registration Number</Label>
          <Input
            id="registrationNumber"
            placeholder="Enter your registration number"
            value={data.registrationNumber || ''}
            onChange={(e) => updateData({ registrationNumber: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="address">Business Address</Label>
          <Input
            id="address"
            placeholder="Enter your business address"
            value={data.address || ''}
            onChange={(e) => updateData({ address: e.target.value })}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
