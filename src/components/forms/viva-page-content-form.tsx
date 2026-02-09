'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  bannerImage: z.string().url(),
  product1Id: z.string(),
  product2Id: z.string(),
  product3Id: z.string(),
});

export function VivaPageContentForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bannerImage: '',
      product1Id: '',
      product2Id: '',
      product3Id: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({ title: 'Success', description: 'Viva page content updated successfully.' });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bannerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/banner.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Enter the URL of the banner image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product1Id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product 1 ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter product ID" {...field} />
              </FormControl>
              <FormDescription>
                Enter the ID of the first product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product2Id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product 2 ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter product ID" {...field} />
              </FormControl>
              <FormDescription>
                Enter the ID of the second product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product3Id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product 3 ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter product ID" {...field} />
              </FormControl>
              <FormDescription>
                Enter the ID of the third product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
