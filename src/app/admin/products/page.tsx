import { promises as fs } from 'fs';
import path from 'path';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AddProductButton } from './_components/buttons';
import { ProductsTable } from './_components/table';

// Define the type for a product for type safety
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
    createdAt: string;
}

// Function to fetch products from the mock database
async function getProducts(): Promise<Product[]> {
    const dbFilePath = path.join(process.cwd(), 'public', 'site-data', 'products.json');
    try {
        const data = await fs.readFile(dbFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If the file doesn't exist, it means no products have been added yet.
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your store's products ({products.length} found).</CardDescription>
                </div>
                <AddProductButton />
            </CardHeader>
            <CardContent>
                <ProductsTable data={products} />
            </CardContent>
        </Card>
    );
}
