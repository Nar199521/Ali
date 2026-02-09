
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
  ShoppingCart,
  Users,
  Package,
  Settings,
  LogOut,
  ShieldCheck,
  Library,
  PlusSquare,
  ListMinus
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';
import { MainLogo } from '@/components/main-logo';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading, signOut, isAdmin } = useAppContext();

  useEffect(() => {
    if (!isUserLoading && !isAdmin) {
        router.replace('/signin');
    }
  }, [user, isUserLoading, isAdmin, router]);

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Library },
    { href: '/admin/add-category', label: 'Add Category', icon: PlusSquare },
    { href: '/admin/manage-categories', label: 'Manage Categories', icon: ListMinus },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/verifications', label: 'Verifications', icon: ShieldCheck },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
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
                    <MainLogo />
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
                {/* Header content can go here */}
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
