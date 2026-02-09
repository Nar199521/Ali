import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from './product-card-skeleton';
import { Card, CardContent } from '../ui/card';

export function OwnShopPlusPageSkeleton() {
  return (
    <>
      <div className="bg-primary text-primary-foreground py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="container mx-auto">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-4">
            <div className="z-10 space-y-6">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div className="relative h-64 lg:h-full">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-16 z-20 relative">
        <Skeleton className="h-20 w-full mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 space-y-4">
                <Skeleton className='h-8 w-48' />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className='h-20 w-full' />
                    <Skeleton className='h-20 w-full' />
                    <Skeleton className='h-20 w-full' />
                    <Skeleton className='h-20 w-full' />
                </div>
            </div>
            <Skeleton className='h-full w-full' />
        </div>
        <Card className="mb-8">
          <CardContent className="p-6">
            <Skeleton className="h-8 w-40 mb-4" />
            <Skeleton className="h-5 w-full mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => <ProductCardSkeleton key={i}/>)}
            </div>
          </CardContent>
        </Card>
        <section>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6">
          {[...Array(12)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
      </div>
    </>
  )
}

export function HomePageSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Banner Skeleton */}
      <Skeleton className="h-48 w-full rounded-xl" />

      {/* Today's Deals Skeleton */}
      <section>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* More to Love Skeleton */}
      <section>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-6">
          {[...Array(12)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
