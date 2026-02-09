'use client';

import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { SuperDealsBanner } from "@/components/super-deals-banner";

export default function SuperDealsPage() {
    return (
        <div className="bg-gray-100">
            <SuperDealsBanner />
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}