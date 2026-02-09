
'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { SiteHeader } from '@/components/site-header';
import ProductPreview from '@/components/product-preview';
import { Toaster } from '@/components/ui/toaster';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <SiteHeader />
          {children}
          <ProductPreview />
          <Toaster />
          <MobileBottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
