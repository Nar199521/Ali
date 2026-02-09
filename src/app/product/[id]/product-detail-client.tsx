'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, Store } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from '@/components/skeletons/product-card-skeleton';
import { Product } from '@/lib/types';

const RelatedProducts = dynamic(
  () => import('@/components/related-products').then((m) => m.RelatedProducts),
  { ssr: false }
);

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, openPreview, country } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(product.imageUrls?.[0] || '');

  if (!product) {
    notFound();
  }

  const handlePreview = () => {
    openPreview(product);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg"
                />
              )}
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {product.imageUrls?.map((url, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-lg cursor-pointer border-2 ${
                    selectedImage === url ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(url)}
                >
                  <Image
                    src={url}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {product.name}
            </h1>

            <div className="my-6">
              <span className="text-3xl md:text-4xl font-bold text-primary">
                {formatPrice(product.price, country)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice, country)}
                </span>
              )}
            </div>

            <div
              className="prose prose-sm max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>

            <div className="mt-auto pt-6">
              <div className="grid grid-cols-2 gap-4">
                <Button size="lg" onClick={() => addToCart(product, 1)}>
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" onClick={handlePreview}>
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-3">
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>On-time dispatch rate: 95%</span>
              </p>
              <p className="flex items-start gap-2">
                <Truck className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Free shipping on orders over $50</span>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-9">
          <RelatedProducts product={product} />
        </div>
      </div>
    </div>
  );
}
