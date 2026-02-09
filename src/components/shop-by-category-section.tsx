'use client';

import { VivaSection } from './viva-section';
import { CategoryCarousel } from './category-carousel';
import { homepageContent } from '@/lib/homepage-content';

export function ShopByCategorySection() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-6">{homepageContent.shopByCategoryTitle}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <VivaSection />
        <CategoryCarousel />
      </div>
    </section>
  );
}
