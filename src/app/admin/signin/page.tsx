'use client';

import { LoginForm } from '@/components/forms/login-form';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminLoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <div className="h-8 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-10 bg-muted rounded animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Admin Sign in
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your admin credentials to access the dashboard
          </p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Back to site?{' '}
          <Link
            href="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
