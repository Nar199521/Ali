'use client';
import { Suspense, useState } from 'react';
import SearchResults from './search-results';
import { ProductCardSkeleton } from '@/components/skeletons/product-card-skeleton';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function SearchPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="container mx-auto p-6">
          <div className="flex pt-4">
              <aside className="mr-6 hidden w-1/5 lg:block">
                  <FilterSidebar />
              </aside>
              <main className="w-full lg:w-4/5">
                  <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Search Results</h2>
                      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="lg:hidden">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-3/4 custom-sheet-content">
                          <FilterSidebar />
                        </SheetContent>
                      </Sheet>
                  </div>
                  <Suspense fallback={
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                          {[...Array(10)].map((_, i) => <ProductCardSkeleton key={i} />)}
                      </div>
                  }>
                      <SearchResults />
                  </Suspense>
              </main>
          </div>
      </div>
    </SidebarProvider>
  );
}
