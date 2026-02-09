'use client';

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { homepageContent } from "@/lib/homepage-content";
import Image from "next/image";

export function VivaSection() {
    return (
        <div className="bg-cyan-100 p-6 rounded-lg relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-4xl font-bold font-serif">{homepageContent.vivaBannerTitle}</h2>
                <p className="mb-4">Your fashion choice</p>
                <Button variant="dark" className="mb-6">Shop now</Button>
                <div className="grid grid-cols-3 gap-4">
                    {homepageContent.vivaProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <Image
                src="/images/viva-banner.png"
                alt="Fashion model"
                width={400}
                height={400}
                className="absolute top-0 right-0 z-0 opacity-50 md:opacity-100"
            />
        </div>
    );
}
