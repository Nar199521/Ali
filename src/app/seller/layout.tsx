'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  LogOut,
  Store,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading, signOut, isSeller, userInfo } = useAppContext();

  useEffect(() => {
    if (!isUserLoading && !isSeller) {
        router.replace('/signin');
    }
  }, [user, isUserLoading, isSeller, router]);

  const menuItems = [
    { href: '/seller', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/seller/products', label: 'Products', icon: Package },
  ];
  
  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className='p-8 w-full max-w-6xl'>
              <DashboardSkeleton />
            </div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <Button asChild variant="ghost" className="w-full justify-start h-10">
                <Link href="/" className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                        <Store className="h-6 w-6"/>
                    </div>
                    <span className="font-bold text-lg">Seller Portal</span>
                </Link>
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={signOut} tooltip="Sign Out">
                        <LogOut />
                        <span>Sign Out</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1">
                <h1 className="font-semibold text-lg">{userInfo?.storeName}</h1>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
