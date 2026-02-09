'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { useAppContext } from '@/context/AppContext';
import type { PlaceholderImage } from '@/lib/types';
import { Clock } from 'lucide-react';
import DealsSlider from './deals-slider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { DynamicHomeBanner } from './dynamic-home-banner';
import { DynamicVivaBanner } from './dynamic-viva-banner';
import { NewYearBanner } from './new-year-banner';
import { ShopByCategorySection } from './shop-by-category-section';

const MoreToLove = dynamic(() => import('@/components/more-to-love').then(m => m.MoreToLove), {
  ssr: false,
  loading: () => <div className='text-center mt-8'><Button variant="outline">Loading More...</Button></div>,
});


interface HomePageContentProps {
    worryFreeImage?: PlaceholderImage;
    loadingSkeleton: React.ReactNode;
}

export function HomePageContent({ worryFreeImage, loadingSkeleton }: HomePageContentProps) {
  const { products, isProductsLoading, homeBanners } = useAppContext();
  
  if (isProductsLoading) {
    return <>{loadingSkeleton}</>;
  }

  const todaysDeals = products.filter(p => p.published).slice(0, 8);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <div className="hidden md:block">
        <DynamicHomeBanner />
        {/* Fallback to static banner if no dynamic banners available */}
        {homeBanners.length === 0 && <NewYearBanner />}
      </div>
      <div className="md:hidden">
        <DealsSlider />
      </div>
      
      <section>
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-3xl font-bold text-center">Today's deals</h2>
        </div>
        <div className="border rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-96 flex-shrink-0">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <h3 className="font-bold text-2xl mb-2">SuperDeals</h3>
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-100 px-3 py-1 rounded-full mb-6">
                  <Clock className="w-4 h-4" />
                  <span>Ends in: 20:41:27</span>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Shop now</Button>
              </div>
            </div>
            <div className="flex-grow w-full overflow-hidden">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {todaysDeals.map((product) => (
                    <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <div className="p-1 h-full">
                        <ProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden md:block">
        <ShopByCategorySection />
      </div>

      <DynamicVivaBanner />

      <MoreToLove />
    </div>
  );
}
