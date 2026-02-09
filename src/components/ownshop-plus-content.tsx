'use client';

import {
  Search,
  Camera,
  Gift,
  TrendingUp,
  MessageCircle,
  ChevronRight,
  Sparkles,
  ShoppingBasket,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/AppContext';
import type { PlaceholderImage } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from './product-card';

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-accent-foreground p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-accent-foreground/80">{description}</p>
      </div>
    </div>
  );
}

interface OwnShopPlusContentProps {
  businessBanner?: PlaceholderImage;
}

export function OwnShopPlusContent({
  businessBanner,
}: OwnShopPlusContentProps) {
  const { products } = useAppContext();

  const orderAgainProducts = products.slice(0, 5);
  const pickedForYouProducts = products.slice(5, 17);

  return (
    <>
      {/* Header Section */}
      <div className="bg-primary text-primary-foreground py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex justify-between items-start">
            <div className="text-xs">
              <span className="bg-primary-foreground text-primary font-bold py-1 px-2 rounded-md">
                BLACK FRIDAY
              </span>
              <span className="ml-2">Nov 20-28 PT</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-4">
            <div className="z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
                Up to 80% off top items
              </h1>
              <div className="mt-6 bg-background p-2 rounded-lg flex items-center gap-2 shadow-lg">
                <Search className="text-muted-foreground ml-2" />
                <Input
                  placeholder="Describe what you need"
                  className="border-none focus-visible:ring-0 text-base bg-transparent"
                />
                <Button variant="ghost" className="text-muted-foreground">
                  <Camera className="mr-2 h-4 w-4" />
                  Image search
                </Button>
                <Button>Send</Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                <Link href="#" className="hover:underline">
                  Smart watch for fitness tracking
                </Link>
                <Link href="#" className="hover:underline">
                  Poco f7 Pro best price smartphone
                </Link>
                <Link href="#" className="hover:underline">
                  SSD internal hard drive m.2 laptop
                </Link>
              </div>
            </div>
            <div className="relative h-64 lg:h-full">
              {businessBanner && (
                <Image
                  src={businessBanner.imageUrl}
                  alt="Business Banner"
                  fill
                  className="object-contain pointer-events-none"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-16 z-20 relative">
        <Card className="shadow-lg mb-8">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex gap-4">
              <Button
                size="lg"
                variant="ghost"
                className="font-bold text-base"
              >
                <Sparkles className="mr-2 text-primary" />
                Personalized sourcing
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-muted-foreground text-base"
              >
                <ShoppingBasket className="mr-2" />
                Shop Radar
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Didn't find what you want?
              </p>
              <Button variant="outline">Source now</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-accent text-accent-foreground p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Business benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitCard
                icon={<Gift className="text-accent" />}
                title="Earn by campaign"
                description="Join and earn commission. Select countries only."
              />
              <BenefitCard
                icon={<Heart className="text-accent" />}
                title="Sample available"
                description="Exclusive offer coming soon"
              />
              <BenefitCard
                icon={<TrendingUp className="text-accent" />}
                title="Top-ranking items"
                description="Explore recent bestsellers on AliExpress"
              />
              <BenefitCard
                icon={<MessageCircle className="text-accent" />}
                title="Easy inquiries"
                description="Request an RFQ from sellers directly in the chat interface"
              />
            </div>
          </div>
          <Card>
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="font-semibold mb-2">Influencers</h3>
              <h3 className="font-semibold mb-2">Wholesalers</h3>
              <h3 className="font-semibold mb-4">Dropshippers</h3>
              <Button asChild className="w-full">
                <Link href="/business-verification">
                  Verify identity to access benefits
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              <h2 className="text-xl font-bold">Order it again</h2>
            </div>
            <Button variant="ghost">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your popular picks with discounts like ~R0.52 on 3+ pcs,
              similar items you viewed before, and trending categories like
              Motorcycle Equipments & Parts and Home Improvement for great
              deals!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {orderAgainProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="text-primary" />
              <h2 className="text-xl font-bold">Bulk saver hub</h2>
            </div>
            <Button variant="ghost">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Items in various categories. Buy 3 to save Rs.8.48 on Computer &
              Office or essentials, or Buy 3 for Rs.300.0 on Home Improvement
              items - ideal for wholesale!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.slice(5, 10).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-xl font-bold mb-4">Picked for you</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {pickedForYouProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
