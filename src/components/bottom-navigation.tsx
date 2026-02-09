'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {Home, LayoutGrid, ShoppingCart, User} from 'lucide-react';

export function BottomNavigation() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Category', href: '/category', icon: LayoutGrid },
        { name: 'Cart', href: '/cart', icon: ShoppingCart },
        { name: 'Account', href: '/account', icon: User }
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                {navLinks.map((link) => {
                    const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
                        >
                            <link.icon 
                                className={cn(
                                    "w-5 h-5 mb-2",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                                )}
                            />
                            <span 
                                className={cn(
                                    "text-sm",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                                )}
                            >
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
