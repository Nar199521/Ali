'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.preprocess((a) => parseFloat(a as string), z.number().min(0, 'Price must be a positive number')),
  originalPrice: z.preprocess((a) => parseFloat(a as string), z.number().min(0, 'Original price must be a positive number')),
  categoryId: z.string().min(1, 'Category is required'),
  stock: z.preprocess((a) => parseInt(a as string, 10), z.number().min(0, 'Stock must be a positive number')),
});

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export default function AddProductPage() {
  const { user, addProduct } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [displayImage, setDisplayImage] = useState<File | null>(null);
  const [previewImages, setPreviewImages] = useState<File[]>([]);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      categoryId: '',
      stock: 0,
    },
  });

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'seller')) {
      router.push('/');
    }
  }, [user, router]);

  const onSubmit = async (data: any) => {
    if (!displayImage) {
      toast({ variant: 'destructive', title: 'Display image is required' });
      return;
    }

    const displayImageUrl = await toBase64(displayImage);
    const previewImageUrls = await Promise.all(previewImages.map(f => toBase64(f)));

    const newProduct = {
        ...data,
        id: uuidv4(),
        categoryId: parseInt(data.categoryId, 10),
        rating: Math.random() * (5 - 3) + 3, // Random rating between 3 and 5
        sold: Math.floor(Math.random() * 500),
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrls: [displayImageUrl, ...previewImageUrls],
        store: {
            id: user.id,
            name: user.storeName || 'My Store',
        }
    };
    addProduct(newProduct);
    toast({ title: 'Product Added', description: 'Your product has been added successfully.' });
    reset();
    setDisplayImage(null);
    setPreviewImages([]);
    router.push(user.role === 'admin' ? '/admin/products' : '/seller');
  };

  if (!user || (user.role !== 'admin' && user.role !== 'seller')) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <Input id="name" {...field} className="mt-1" />}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => <Textarea id="description" {...field} className="mt-1" />}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <Controller
                            name="price"
                            control={control}
                            render={({ field }) => <Input id="price" type="number" {...field} className="mt-1" />}
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Original Price</label>
                            <Controller
                            name="originalPrice"
                            control={control}
                            render={({ field }) => <Input id="originalPrice" type="number" {...field} className="mt-1" />}
                            />
                            {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice.message}</p>}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
                            <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                                </SelectContent>
                                </Select>
                            )}
                            />
                            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                            <Controller
                            name="stock"
                            control={control}
                            render={({ field }) => <Input id="stock" type="number" {...field} className="mt-1" />}
                            />
                            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Display Image</label>
                        <Input type="file" onChange={(e) => setDisplayImage(e.target.files ? e.target.files[0] : null)} className="mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preview Images (up to 5)</label>
                        <Input type="file" multiple onChange={(e) => setPreviewImages(Array.from(e.target.files || []).slice(0, 5))} className="mt-1" />
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="button" onClick={() => router.push('/product/preview')}>See Preview</Button>
                        <Button type="submit">Add Product</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
