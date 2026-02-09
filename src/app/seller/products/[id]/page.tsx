'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Product ID: {id}</p>
            <p className="my-4">Product editing is currently disabled. Please manage products through the connected database.</p>
            <Link href="/seller/products" passHref>
              <Button variant="outline">Back to Products</Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
