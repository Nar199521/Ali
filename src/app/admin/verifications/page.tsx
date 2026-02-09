'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

interface Verification {
  id: number;
  email: string;
  companyName: string;
  registrationNumber: string;
  address: string;
  certificate: string;
  taxId: string;
  status: string;
}

export default function VerificationsPage() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const { isAuthenticated, isAdmin, isUserLoading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isUserLoading, isAdmin, router]);

  useEffect(() => {
    if(isAdmin) {
        const fetchVerifications = async () => {
          try {
            const response = await fetch('/api/verifications');
            if (response.ok) {
              const data = await response.json();
              setVerifications(data);
            } else {
              console.error("Failed to fetch verifications");
            }
          } catch (error) {
            console.error("Error fetching verifications:", error);
          }
        };
        fetchVerifications();
    }
  }, [isAdmin]);

  const updateVerificationStatus = async (id: number, status: string) => {
    const response = await fetch(`/api/verifications/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }
    );

    if (response.ok) {
        const updatedVerifications = verifications.map(verification => 
            verification.id === id ? { ...verification, status } : verification
        );
        setVerifications(updatedVerifications);
    }
  };

  const handleApprove = (id: number) => {
    updateVerificationStatus(id, 'approved');
  };

  const handleReject = (id: number) => {
    updateVerificationStatus(id, 'rejected');
  };

  if (isUserLoading || !isAuthenticated || !isAdmin) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Business Verifications</h1>
      <div className="space-y-4">
        {verifications.length === 0 ? (
          <div className="text-center text-gray-500">No verifications found.</div>
        ) : (
          verifications.map((verification) => (
            <div key={verification.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between">
                  <h2 className="mb-4 text-xl font-bold">{verification.companyName}</h2>
                  <p className={`capitalize font-semibold ${verification.status === 'pending' ? 'text-yellow-500' : verification.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>{verification.status}</p>
              </div>
              <p className="mb-4 text-sm text-gray-500">{verification.email}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Business Information</h3>
                  <p>Registration Number: {verification.registrationNumber}</p>
                  <p>Address: {verification.address}</p>
                </div>
                <div>
                  <h3 className="font-medium">Uploaded Documents</h3>
                  <p>Certificate of Incorporation: {verification.certificate}</p>
                  <p>Proof of Tax ID: {verification.taxId}</p>
                </div>
              </div>
              {verification.status === 'pending' &&
                  <div className="mt-6 flex justify-end gap-4">
                  <Button variant="outline" onClick={() => handleReject(verification.id)}>Reject</Button>
                  <Button onClick={() => handleApprove(verification.id)}>Approve</Button>
                  </div>
              }
            </div>
          ))
        )}
      </div>
    </div>
  );
}
