'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';

export default function NewProductPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let imageUrl = '';
            // Step 1: Upload image if one is selected
            if (imageFile) {
                // Using 'products' as the upload preset for Cloudinary
                imageUrl = await uploadToCloudinary(imageFile, 'products');
            }

            // Step 2: Gather form data
            const formData = new FormData(e.target as HTMLFormElement);
            const productData = {
                ...Object.fromEntries(formData.entries()),
                price: parseFloat(formData.get('price') as string),
                stock: parseInt(formData.get('stock') as string, 10),
                imageUrl, // Add the Cloudinary URL to the product data
            };

            // Step 3: Send data to the backend API
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            toast({ title: 'Success!', description: 'Product created successfully.' });
            router.push('/admin/products');
            router.refresh(); // Refresh the server component data on the products page

        } catch (error) {
            console.error('Error creating product:', error);
            toast({ 
                title: 'Error', 
                description: error instanceof Error ? error.message : 'Could not create the product.', 
                variant: 'destructive' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add a New Product</CardTitle>
                <CardDescription>Fill out the form below to add a new product to your store.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" name="name" placeholder="e.g., Summer T-Shirt" required />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" placeholder="e.g., Apparel" required />
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Describe the product..." required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" name="price" type="number" placeholder="e.g., 29.99" required min="0" step="0.01" />
                        </div>

                        {/* Stock */}
                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" name="stock" type="number" placeholder="e.g., 100" required min="0" />
                        </div>
                    </div>
                    
                    {/* Product Image */}
                    <div className="space-y-2">
                        <Label htmlFor="image">Product Image</Label>
                        <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
                        <p className="text-sm text-muted-foreground">Upload an image for the product.</p>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
