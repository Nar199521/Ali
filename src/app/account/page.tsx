'use client';

import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ChevronRight, LogOut } from 'lucide-react';

export default function AccountPage() {
  const { user, isUserLoading, signOut } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/signin');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <Card className="overflow-hidden shadow-none border-0">
      <CardHeader className="p-4 md:p-6 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <AvatarFallback>{user.displayName?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold">{user.displayName || 'Welcome!'}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-2">
        <Link href="/account/orders" className="flex items-center justify-between p-3 -m-3 rounded-md hover:bg-accent transition-colors">
            <div className="grid gap-1">
                <p className="font-medium">Order History</p>
                <p className="text-sm text-muted-foreground">View your past orders</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
        <Link href="/account/settings" className="flex items-center justify-between p-3 -m-3 rounded-md hover:bg-accent transition-colors">
            <div className="grid gap-1">
                <p className="font-medium">Account Settings</p>
                <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
        
        <Separator className="my-4" />

        <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500" 
            onClick={() => signOut()}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
