'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/data';
import { useAppContext } from '@/context/AppContext';
import type { Product } from '@/lib/types';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, updateProduct } = useAppContext();
  const [product, setProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    const p = products.find((p) => p.id === id);
    if (p) {
      setProduct(p);
    }
  }, [id, products]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (product) {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCategoryChange = (value: string) => {
    if (product) {
      setProduct({ ...product, categoryId: parseInt(value) });
    }
  };

  const handleSave = () => {
    if (product) {
      updateProduct(product.id as string, product as Product);
      router.push('/seller/products');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Input id="name" name="name" value={product.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea id="description" name="description" value={product.description} onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <Input id="price" name="price" type="number" value={product.price} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Original Price</label>
                <Input id="originalPrice" name="originalPrice" type="number" value={product.originalPrice} onChange={handleInputChange} />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                <Input id="stock" name="stock" type="number" value={product.stock} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
                <Select onValueChange={handleCategoryChange} defaultValue={String(product.categoryId)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
