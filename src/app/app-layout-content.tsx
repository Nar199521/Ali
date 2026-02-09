'use client';
import { usePathname } from 'next/navigation';
import { BottomNavigation } from '@/components/bottom-navigation';
import { Toaster } from '@/components/ui/toaster';
import { SiteFooter } from '@/components/site-footer';
import { useAppContext } from '@/context/AppContext';
import ProductPreview from '@/components/product-preview';

const AppLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { isPreviewOpen, previewProduct } = useAppContext();

  const shouldShowFooter = !['/login', '/signup', '/admin'].some(path => pathname.startsWith(path));

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">{children}</main>
      {shouldShowFooter && (
        <>
          <SiteFooter />
          <BottomNavigation />
        </>
      )}
      <Toaster />
      {isPreviewOpen && previewProduct && <ProductPreview previewProduct={previewProduct} />}
    </div>
  );
};

export default AppLayoutContent;
