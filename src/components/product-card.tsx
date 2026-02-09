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
        <Card className="overflow-hidden flex flex-col">
            <CardHeader className="p-0">
                <div className="aspect-square relative">
                    {imageSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={imageSrc}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm text-gray-500">No Image</span>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 truncate">{product.description || ''}</p>
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <Badge variant="outline">{product.category || product.store?.name || ''}</Badge>
                    <span className="font-semibold text-lg">
                        {formatPrice(product.price, country)}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => openPreview && openPreview(product)} className="flex-1">
                        See preview
                    </Button>
                    <Link href={`/category/${categoryId}`} className="flex-1">
                        <Button variant="outline" className="w-full">See similar</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
