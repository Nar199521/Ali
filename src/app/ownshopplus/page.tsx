'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OwnShopPlusContent } from '@/components/ownshop-plus-content';
import type { Metadata } from 'next';
import { useAppContext } from '@/context/AppContext';
import { OwnShopPlusPageSkeleton } from '@/components/skeletons/home-page-skeleton';

// export const metadata: Metadata = {
//   title: 'OwnShop Plus - Business Benefits | GlobalCart',
//   description:
//     'Access exclusive business benefits like personalized sourcing, wholesale prices, and influencer tools. Verify your business to get started.',
// };

export default function OwnShopPlusPage() {
  const { isProductsLoading } = useAppContext();
  const businessBanner = PlaceHolderImages.find(
    (p) => p.id === 'business-banner'
  );

  if (isProductsLoading) {
    return <OwnShopPlusPageSkeleton />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <OwnShopPlusContent businessBanner={businessBanner} />
    </div>
  );
}
