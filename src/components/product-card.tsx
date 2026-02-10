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
            <CardHeader className="p-0 overflow-hidden flex-1">
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
                            <span className="text-xs text-gray-500">No Image</span>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-3 flex flex-col justify-start">
                <h3 className="text-sm font-semibold line-clamp-2 h-10">{product.name}</h3>
            </CardContent>
            <CardFooter className="p-3 flex flex-col gap-2 border-t">
                <div className="flex items-center justify-between w-full">
                    <Badge variant="outline" className="text-xs py-0">{product.category || product.store?.name || ''}</Badge>
                    <span className="font-bold text-sm">
                        {formatPrice(product.price, country)}
                    </span>
                </div>
                <div className="flex gap-1 w-full">
                    <Button 
                        variant="ghost" 
                        onClick={() => openPreview && openPreview(product)} 
                        className="flex-1 text-xs h-8 py-1"
                    >
                        See preview
                    </Button>
                    <Link href={`/category/${categoryId}`} className="flex-1">
                        <Button variant="outline" className="w-full text-xs h-8 py-1">See similar</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
