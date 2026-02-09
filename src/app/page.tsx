import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { slugify } from '@/lib/utils';
import type { Metadata } from 'next';
import { HomePageContent } from '@/components/home-page-content';
import { HomePageSkeleton } from '@/components/skeletons/home-page-skeleton';

export const metadata: Metadata = {
  title: 'Aliaxpress - Your Global Marketplace',
  description: 'Discover and shop for unique items from around the world. Aliaxpress is your one-stop shop for fashion, electronics, home goods, and more.',
};


function CategoryCard({ category }: { category: (typeof categories)[0] }) {
  const image = PlaceHolderImages.find(
    (img) => img.id === slugify(category.name)
  );
  return (
    <Link href={`/category/${slugify(category.name)}`} className="group block">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center">
            <div className="p-4">
              <h3 className="font-semibold leading-tight group-hover:text-primary">{category.name}</h3>
            </div>
            <div className="ml-auto w-24 h-24 relative flex-shrink-0">
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


export default function Home() {
  const worryFreeImage = PlaceHolderImages.find((img) => img.id === 'knife-set');
  
  return (
    <div className="bg-muted/40">
      <HomePageContent 
        worryFreeImage={worryFreeImage} 
        loadingSkeleton={<HomePageSkeleton />}
      />
    </div>
  );
}
