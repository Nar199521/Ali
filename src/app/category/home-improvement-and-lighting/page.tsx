
import { ProductCard } from '@/components/product-card';

const Page = () => {

    return (
        <div className="py-12">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-12">Home Improvement & Lighting</h1>
                
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">More Ways to Shop</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                       {/* Products will be displayed here */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;
