'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AddProductButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/admin/products/new');
    };

    return (
        <Button onClick={handleClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
        </Button>
    );
}
