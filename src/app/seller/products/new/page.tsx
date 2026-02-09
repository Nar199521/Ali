'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/image-upload';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct } = useAppContext();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price,
          categoryId,
          images: imageUrls,
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        addProduct(newProduct);
        router.push('/seller/products');
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('An error occurred while creating the product:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Product</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
            </div>
            <div>
                <Label htmlFor="originalPrice">Original Price</Label>
                <Input id="originalPrice" name="originalPrice" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(parseFloat(e.target.value))} />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div>
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" name="stock" type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} />
            </div>
            <div>
                <Label htmlFor="categoryId">Category</Label>
                <Select onValueChange={(value) => setCategoryId(parseInt(value))} defaultValue={String(categoryId)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div>
          <Label>Images (up to 5)</Label>
          <ImageUpload value={imageUrls} onChange={setImageUrls} maxImages={5} />
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
}
