'use client';

import { useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { ProductCard } from '@/components/product-card';
import { ProductCardSkeleton } from '@/components/skeletons/product-card-skeleton';
import { useSidebar } from "@/components/ui/sidebar";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get('q') : null;
  const { products, categories, isProductsLoading } = useAppContext();
  const { priceRange, rating, deals } = useSidebar();

  const filteredProducts = (products && categories) ? products.filter((product) => {
    const lowerCaseQuery = query?.toLowerCase() || '';
    const category = categories.find(c => c.id === product.categoryId);
    
    const inQuery = product.name.toLowerCase().includes(lowerCaseQuery) ||
      (category && category.name.toLowerCase().includes(lowerCaseQuery));

    const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const inRating = product.rating >= rating;
    const inDeals = deals.length === 0 || 
                    (deals.includes('sale') && product.originalPrice);

    return inQuery && inPriceRange && inRating && inDeals;
  }) : [];

  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4";

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Search results for "{query}"</h1>
      
      {isProductsLoading || !categories ? (
        <div className={gridClasses}>
            {[...Array(10)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className={gridClasses}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found for your search.</p>
      )}
    </>
  );
}
