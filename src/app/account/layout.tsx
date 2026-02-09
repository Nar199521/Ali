'use client';

import { useState } from 'react';
import { AccountSidebar } from '@/components/account/account-sidebar';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="hidden md:block md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <AccountSidebar />
        </aside>
        <div className="md:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Account</h2>
                <SheetClose asChild>
                   <Button variant="ghost" size="icon">
                     <X className="h-6 w-6" />
                     <span className="sr-only">Close menu</span>
                   </Button>
                </SheetClose>
              </div>
              <AccountSidebar />
            </SheetContent>
          </Sheet>
        </div>
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  );
}
