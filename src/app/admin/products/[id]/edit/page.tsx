'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/data';
import { ImageUpload } from '@/components/image-upload';
import type { Product } from '@/lib/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { products, updateProduct, getProductById, isProductsLoading } = useAppContext();
  const [product, setProduct] = useState<Partial<Product> | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!isProductsLoading && id) {
      const productToEdit = getProductById(id as string);
      if (productToEdit) {
        setProduct(productToEdit);
        setImages(productToEdit.images || []);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }
  }, [id, products, isProductsLoading, getProductById]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (product) {
      const isNumeric = ['price'].includes(name);
      setProduct({ ...product, [name]: isNumeric ? Number(value) || 0 : value });
    }
  };

  const handleCategoryChange = (value: string) => {
    if (product) {
        setProduct({ ...product, categoryId: value });
    }
  }

  const handleImageChange = (urls: string[]) => {
    setImages(urls);
  }

  const handleSave = async () => {
    if (product && id) {
      updateProduct(id as string, { ...product, images });
      router.push('/admin/products');
    }
  };

  if (isProductsLoading) {
    return <div>Loading...</div>;
  }

  if (notFound) {
    return (
      <div className="text-center">
        <p className="text-lg">Product not found</p>
        <Button onClick={() => router.push('/admin/products')} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={product.name || ''} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={product.description || ''}
            onChange={handleInputChange}
          />
        </div>
         <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" value={product.price || ''} onChange={handleInputChange} />
        </div>
        <div>
            <Label htmlFor="categoryId">Category</Label>
            <Select onValueChange={handleCategoryChange} defaultValue={String(product.categoryId)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        <div>
          <Label>Images (up to 5)</Label>
          <ImageUpload
            value={images}
            onChange={handleImageChange}
            maxImages={5}
          />
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
