'use client';

import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import Image from 'next/image';
import Link from 'next/link';

export function DynamicVivaBanner() {
  const { vivaBanners, products } = useAppContext();

  if (vivaBanners.length === 0) {
    return null; // Don't render if no banners
  }

  const banner = vivaBanners[0]; // Display the first/latest banner
  const bgColor = banner.background_color || '#e0f2fe';

  // Show some products that match this viva banner
  const vivaBannerProducts = products.slice(0, 3);

  return (
    <div
      className="rounded-lg p-8 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative z-10">
        <h2 className="text-4xl font-bold font-serif mb-2">{banner.title}</h2>
        {banner.subtitle && (
          <p className="mb-6 text-lg">{banner.subtitle}</p>
        )}
        {banner.button_text && banner.button_link ? (
          <Link href={banner.button_link}>
            <Button variant="dark" className="mb-6">
              {banner.button_text}
            </Button>
          </Link>
        ) : banner.button_text ? (
          <Button variant="dark" className="mb-6">
            {banner.button_text}
          </Button>
        ) : null}

        {vivaBannerProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vivaBannerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {banner.image_url && (
        <Image
          src={banner.image_url}
          alt={banner.title}
          width={400}
          height={400}
          className="absolute top-0 right-0 z-0 opacity-50 md:opacity-100"
        />
      )}
    </div>
  );
}
