'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '../page'; // Importing the Product type

// Action to delete a product (this will be a server action in the future)
async function deleteProduct(productId: string) {
    // For now, this is a placeholder.
    // In a real app, this would make an API call.
    console.log(`Deleting product with ID: ${productId}`);

    // Simulate API call
    return new Promise(resolve => setTimeout(resolve, 500));
}

export function ProductsTable({ data }: { data: Product[] }) {
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();

    const handleDelete = (productId: string) => {
        if (isPending) return;

        startTransition(async () => {
            await deleteProduct(productId);
            toast({
                title: 'Action Required',
                description: 'Product deletion is not fully implemented. Please manually remove from products.json and refresh.',
                variant: 'destructive'
            });
            // You would typically refresh the data here, e.g., router.refresh()
        });
    };

    if (!data.length) {
        return (
            <div className="border rounded-md">
                <div className="p-8 text-center">
                    <h3 className="text-lg font-semibold">No Products Found</h3>
                    <p className="text-sm text-muted-foreground">
                        Click "Add New Product" to get started.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden md:table-cell">Price</TableHead>
                        <TableHead className="hidden md:table-cell">Stock</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                                {product.imageUrl ? (
                                    <img
                                        alt={product.name}
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={product.imageUrl}
                                        width="64"
                                    />
                                ) : (
                                    <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                                        <span className="text-xs text-gray-500">No Image</span>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{product.category}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                ${product.price.toFixed(2)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="text-red-500" 
                                            onClick={() => handleDelete(product.id)}
                                            disabled={isPending}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
