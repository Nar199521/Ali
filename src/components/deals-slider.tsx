'use client';

import Image from 'next/image';

import { useAppContext } from '@/context/AppContext';
import { formatPrice } from '@/lib/utils';
import { homepageContent } from '@/lib/homepage-content';

export default function DealsSlider() {
  const { country } = useAppContext();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{homepageContent.dealsTitle}</h2>
        <a href="#" className="text-primary text-sm font-semibold">
          View all
        </a>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {homepageContent.dealsProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-40">
            <div className="bg-gray-100 rounded-lg p-2">
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                width={150}
                height={150}
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
            <div className="mt-2">
              <p className="font-semibold text-lg">
                {formatPrice(product.price, country)}
              </p>
              <p className="text-sm text-gray-500 line-through">
                {product.originalPrice &&
                  formatPrice(product.originalPrice, country)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
