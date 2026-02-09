'use client';

import { Card } from '@/components/ui/card';
import { TSubCategory } from '@/lib/data';
import Link from 'next/link';

export default function ShopByCategory({ subCategories }: { subCategories: TSubCategory[] }) {
    return (
        <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {subCategories.map((subcategory) => (
                    <Link href={`/category/${subcategory.id}`} key={subcategory.id} className="text-center p-4 border rounded-lg">
                        <p className="mt-2 font-semibold">{subcategory.name}</p>
                    </Link>
                ))}
            </div>
        </Card>
    );
}
