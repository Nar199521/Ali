import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/data';
import { Product } from '@/lib/types';

// GET request handler to fetch a single product by its ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = products.find(p => p.id === id);

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);

    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT request handler to update an existing product
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        const body: Partial<Product> = await req.json();

        const updatedProduct = { ...products[productIndex], ...body, updatedAt: new Date().toISOString() };
        products[productIndex] = updatedProduct as Product;

        return NextResponse.json(updatedProduct);

    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE request handler to remove a product
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        products.splice(productIndex, 1);

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
