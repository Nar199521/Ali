'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { VerificationData } from '@/app/business-verification/page';

interface ReviewStepProps {
  onBack: () => void;
  data: VerificationData;
}

export function ReviewStep({ onBack, data }: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const { user, isAuthenticated, isUserLoading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isUserLoading, router]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!user) {
      setIsSubmitting(false);
      return;
    }

    const verificationData = {
      userId: user.id,
      companyName: data.companyName,
      registrationNumber: data.registrationNumber,
      address: data.address,
      certificate: data.certificate?.name,
      taxId: data.taxId?.name,
      status: 'pending',
    };

    try {
      const response = await fetch('/api/verifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUserLoading || !isAuthenticated) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">Review & Submit</h2>
      {submissionStatus === 'success' ? (
        <div className="text-center">
          <p className="text-green-500">Verification submitted successfully!</p>
          <p>An admin will review your submission.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 rounded-lg border bg-white p-6">
            <div>
              <h3 className="font-medium">Business Information</h3>
              <p>Company Name: {data.companyName}</p>
              <p>Business Registration Number: {data.registrationNumber}</p>
              <p>Business Address: {data.address}</p>
            </div>
            <div>
              <h3 className="font-medium">Uploaded Documents</h3>
              <p>Certificate of Incorporation: {data.certificate?.name}</p>
              <p>Proof of Tax ID: {data.taxId?.name}</p>
            </div>
          </div>
          {submissionStatus === 'error' && (
            <p className="mt-4 text-center text-red-500">Error submitting verification. Please try again.</p>
          )}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={onBack} disabled={isSubmitting}>Back</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !isAuthenticated}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
