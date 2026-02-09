import { Suspense } from 'react';
import { HeroBanner } from '@/components/hero-banner';
import { ProductGrid } from '@/components/product-grid';
import { promises as fs } from 'fs';
import path from 'path';

// Define a type for our banner settings for type safety
interface BannerSettings {
  title: string;
  imageUrl: string;
}

// Define a type for a Product
interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
    createdAt: string;
}


// Function to fetch banner settings safely
async function getBannerSettings(): Promise<BannerSettings> {
  const settingsFilePath = path.join(process.cwd(), 'public', 'site-settings', 'banner-settings.json');
  try {
    const data = await fs.readFile(settingsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Could not read banner settings:', error);
    return { title: 'Welcome to Our Store', imageUrl: '' }; // Default fallback
  }
}

// Function to fetch products from the mock database
async function getProducts(): Promise<Product[]> {
    const dbFilePath = path.join(process.cwd(), 'public', 'site-data', 'products.json');
    try {
        const data = await fs.readFile(dbFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}


export default async function HomePage() {
  const bannerSettings = await getBannerSettings();
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Banner Section */}
      <HeroBanner 
        title={bannerSettings.title}
        imageUrl={bannerSettings.imageUrl}
      />

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-center">Our Products</h2>
        <Suspense fallback={<p className='text-center p-4'>Loading products...</p>}>
            <ProductGrid products={products} />
        </Suspense>
      </section>
    </div>
  );
}
