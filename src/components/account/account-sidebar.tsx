'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SheetClose } from '@/components/ui/sheet';

const sidebarNavItems = [
  { title: 'Overview', href: '/account' },
  { title: 'Orders', href: '/account/orders' },
  { title: 'Payment', href: '/payment' },
  { title: 'Returns/refunds', href: '/account/returns-refunds' },
  { title: 'Feedback', href: '#' },
  { title: 'Settings', href: '/account/settings' },
  { title: 'Shipping address', href: '/account/shipping-address' },
  { title: 'Message center', href: '/account/message-center' },
  { title: 'Invite friends', href: '/account/invite-friends' },
  { title: 'Help center', href: '/account/help-center' },
  { title: 'Manage reports', href: '/account/manage-reports' },
  { title: 'Suggestion', href: '/account/suggestion' },
  { title: 'DS Center', href: '/account/ds-center' },
  { title: 'Penalties information', href: '/account/penalties-information' },
  { title: 'Recalls and Product Safety Alerts', href: '/account/recalls-product-safety' },
];

const adminNavItems = [
    { title: 'Homepage', href: '/admin/homepage' },
];

export function AccountSidebar({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1">
      {sidebarNavItems.map((item) => {
        const link = (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-md hover:bg-accent',
              pathname === item.href ? 'bg-accent' : 'hover:bg-transparent'
            )}
            onClick={onLinkClick}
          >
            {item.title}
          </Link>
        );
        return onLinkClick ? <SheetClose asChild>{link}</SheetClose> : link;
      })}
        <div className="px-4 pt-4">
            <h2 className="text-lg font-semibold">Admin</h2>
        </div>
        {adminNavItems.map((item) => {
            const link = (
                <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                        'px-4 py-2 text-sm font-medium rounded-md hover:bg-accent',
                        pathname === item.href ? 'bg-accent' : 'hover:bg-transparent'
                    )}
                    onClick={onLinkClick}
                >
                    {item.title}
                </Link>
            );
            return onLinkClick ? <SheetClose asChild>{link}</SheetClose> : link;
        })}
    </nav>
  );
}
