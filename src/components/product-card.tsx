'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { formatPrice } from '@/lib/utils';

// Flexible product type (from app data)
type ProductLike = any;

export function ProductCard({ product }: { product: ProductLike }) {
    const { openPreview, country } = useAppContext();

    const imageSrc = product.imageUrl || (product.imageUrls && product.imageUrls[0]) || '/placeholder.svg';
    const categoryId = product.categoryId || product.category || '';

    return (
        <Card className="overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="p-0 overflow-hidden">
                <div className="aspect-square relative bg-gray-100">
                    {imageSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={imageSrc}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-300 ease-out hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm text-gray-500">No Image</span>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col justify-between min-h-[100px]">
                <div>
                    <h3 className="text-base font-semibold line-clamp-2 h-14">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 h-8">{product.description || ''}</p>
                </div>
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-3 border-t">
                <div className="flex items-center justify-between w-full">
                    <Badge variant="outline" className="text-xs">{product.category || product.store?.name || ''}</Badge>
                    <span className="font-semibold text-base">
                        {formatPrice(product.price, country)}
                    </span>
                </div>
                <div className="flex gap-2 w-full">
                    <Button 
                        variant="ghost" 
                        onClick={() => openPreview && openPreview(product)} 
                        className="flex-1 text-sm h-9"
                    >
                        See preview
                    </Button>
                    <Link href={`/category/${categoryId}`} className="flex-1">
                        <Button variant="outline" className="w-full text-sm h-9">See similar</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
