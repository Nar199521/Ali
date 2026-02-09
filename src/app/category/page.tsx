
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  const category = categories.find((c) => c.name.toLowerCase() === "");

  const categoryProducts = products.filter((p) => p.categoryId === category?.id);

  const subcategories = [{"name":"Radio 01","image_url":"/images/categories/1768755516328-radio-1954856_640.jpg","href":"#"}];

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 xl:max-w-7xl xl:mx-auto xl:px-8">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900"></h1>
        </div>

        <div className="mt-8 px-4 sm:px-6 lg:px-8 xl:px-0">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-y-10 gap-x-6">
                {subcategories.map((subcategory) => (
                <Link key={subcategory.name} href={subcategory.href} className="group text-center">
                    <div className="relative w-24 h-24 mx-auto">
                    <Image
                        src={subcategory.image_url}
                        alt={subcategory.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                    {subcategory.name}
                    </p>
                </Link>
                ))}
            </div>
        </div>


        <div className="mt-16 px-4 sm:px-6 lg:px-8 xl:px-0">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">More Ways to Shop</h2>
        </div>

        <div className="mt-6 px-4 sm:px-6 lg:px-8 xl:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
