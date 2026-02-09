'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import type { Product } from '@/lib/types';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { getProductById, isProductsLoading, addToCart } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (id && !isProductsLoading) {
      const foundProduct = getProductById(id as string);
      setProduct(foundProduct);
      if (foundProduct && foundProduct.imageUrls.length > 0) {
        setSelectedImage(foundProduct.imageUrls[0]);
      }
    }
  }, [id, getProductById, isProductsLoading]);

  if (isProductsLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div>
            <AspectRatio ratio={1 / 1} className="mb-4">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.name}
                  layout="fill"
                  className="rounded-md object-cover"
                />
              )}
            </AspectRatio>
            <div className="flex gap-2">
              {product.imageUrls.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(image)} className="w-20 h-20 relative">
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    layout="fill"
                    className={`rounded-md object-cover ${selectedImage === image ? 'ring-2 ring-primary' : ''}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg">{product.description}</p>
            <div className="text-2xl font-bold">${product.price}</div>
            <Button onClick={() => addToCart(product, 1)}>Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
