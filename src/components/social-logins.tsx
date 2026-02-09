'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export function SocialLogins() {
    const googleUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || '';
    const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_AUTH_URL || '';
    const xUrl = process.env.NEXT_PUBLIC_X_AUTH_URL || '';
    const appleUrl = process.env.NEXT_PUBLIC_APPLE_AUTH_URL || '';
  return (
    <div className="grid gap-4">
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
            <Link href={googleUrl || '#'} target={googleUrl ? '_blank' : undefined} rel={googleUrl ? 'noopener noreferrer' : undefined}>
                <Button variant="outline" className="w-full">
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                </Button>
            </Link>
            <Link href={facebookUrl || '#'} target={facebookUrl ? '_blank' : undefined} rel={facebookUrl ? 'noopener noreferrer' : undefined}>
                <Button variant="outline" className="w-full">
                    <Icons.facebook className="mr-2 h-4 w-4" />
                    Facebook
                </Button>
            </Link>
            <Link href={xUrl || '#'} target={xUrl ? '_blank' : undefined} rel={xUrl ? 'noopener noreferrer' : undefined}>
                <Button variant="outline" className="w-full">
                    <Icons.twitter className="mr-2 h-4 w-4" />
                    X
                </Button>
            </Link>
            <Link href={appleUrl || '#'} target={appleUrl ? '_blank' : undefined} rel={appleUrl ? 'noopener noreferrer' : undefined}>
                <Button variant="outline" className="w-full">
                    <Icons.apple className="mr-2 h-4 w-4" />
                    Apple
                </Button>
            </Link>
        </div>
    </div>
  );
}
