'use client';

import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Product } from '@/lib/types';


interface RelatedProductsProps {
    product: Product;
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 10);
  
  if(relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">You might also like</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {relatedProducts.map((relatedProduct) => (
            <CarouselItem
              key={relatedProduct.id}
              className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-1">
                <ProductCard product={relatedProduct} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </div>
  );
}
