import { ProductCard } from './product-card';

// Define a type for a Product
interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
    createdAt: string;
}

export function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-muted-foreground mt-2">No products available at the moment. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
