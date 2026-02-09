'use client';
import { subcategories } from '@/lib/subcategories';
import { products, categories } from '@/lib/data';
import { MoreToLove } from '@/components/more-to-love';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/utils';
import { SubCategory } from '@/lib/types';

const CategoryPage = () => {
    const category = categories.find((c) => c.id === 5);

    if (!category) {
        return notFound();
    }

    const categoryId = category.id;

    const categorySubcategories = subcategories.filter(
        (subcategory) => subcategory.categoryId === categoryId
    );

    const categoryProducts = products.filter((product) => product.categoryId === categoryId);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">{category.name}</h1>
                <h2 className="text-2xl font-bold mb-6 text-center">Shop by Subcategory</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {categorySubcategories.map((subcategory: SubCategory) => (
                        <Link
                            key={subcategory.id}
                            href={`/search?q=${subcategory.name}`}
                            className="text-center group"
                        >
                            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                                <Image
                                    src={subcategory.imageUrl}
                                    alt={subcategory.name}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                            <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                                {subcategory.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6 text-center">More Ways to Shop</h2>
                <MoreToLove products={categoryProducts} />
            </div>
        </div>
    );
};

export default CategoryPage;
