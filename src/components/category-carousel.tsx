'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { categories } from "@/lib/data";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function CategoryCarousel() {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                {Array.from({ length: Math.ceil(categories.length / 6) }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="grid grid-cols-3 grid-rows-2 gap-6">
                            {categories.slice(index * 6, index * 6 + 6).map((category) => (
                                <Link key={category.id} href={`/category/${slugify(category.name)}`}>
                                    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg h-full">
                                        <div className="relative w-24 h-24 mb-2">
                                            <Image
                                                src={category.image_url}
                                                alt={category.name}
                                                width={96}
                                                height={96}
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-center text-sm font-medium">{category.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
    );
}
