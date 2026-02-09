'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppContext } from '@/context/AppContext';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const { products, deleteProduct } = useAppContext();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Products</CardTitle>
        <Button asChild>
            <Link href="/seller/products/new">Create New</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                    <Image src={product.imageUrls[0]} alt={product.name} width={50} height={50} className="rounded-md" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/seller/products/${product.id}/edit`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
