'use client';

import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function SellerPage() {
  const { isAuthenticated, isSeller, isUserLoading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (!isSeller) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isUserLoading, isSeller, router]);

  if (isUserLoading || !isAuthenticated || !isSeller) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Seller Dashboard</h1>
      <p className="mt-4 text-lg">You can manage your products and orders here.</p>
    </div>
  );
}
