'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useAppContext } from '@/context/AppContext';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SocialLogins } from '@/components/social-logins';
import { useState, useEffect } from 'react';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string(),
});

export function LoginForm() {
  const [isClient, setIsClient] = useState(false);
  const { signIn, isUserLoading } = useAppContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await signIn(values.email, values.password);
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.role === 'seller') {
        router.push('/seller');
      } else {
        router.push('/');
      }
    }
  }

  // Defer rendering until client-side to avoid Radix UI ID hydration issues
  if (!isClient) {
    return (
      <div className="grid gap-4">
        <div className="h-10 bg-muted rounded animate-pulse" />
        <div className="h-10 bg-muted rounded animate-pulse" />
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="name@example.com"
                  {...field}
                  disabled={isUserLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                  disabled={isUserLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-sm text-right">
          <Link href="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
            Forgot password?
          </Link>
        </div>
        <Button variant="destructive" type="submit" className="w-full" disabled={isUserLoading}>
          {isUserLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign in
        </Button>
        <SocialLogins />
      </form>
    </Form>
  );
}
