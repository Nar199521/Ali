'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { removeCategory } from './actions';

// Define a type for the category to ensure type safety
interface Category {
    id: number;
    name: string;
    image_url: string;
    icon: string;
}

// A new function to fetch categories from the database via a server action or API route
// For simplicity, we'll create an API route to fetch categories.
// This avoids exposing database logic directly to the client-side page.
async function fetchCategories(): Promise<Category[]> {
    // Assuming an API route /api/categories exists to fetch all categories.
    // This is a placeholder; you would need to implement this API route.
    const response = await fetch('/api/categories');
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
}

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories()
        .then(data => {
            setCategories(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
            toast({ title: 'Error', description: 'Could not fetch categories.', variant: 'destructive' });
            setIsLoading(false);
        });
  }, []);

  const handleRemoveCategory = async (categoryId: number) => {
    const result = await removeCategory(categoryId);

    if (result.success) {
      toast({ title: 'Success', description: result.message });
      // Refresh the list of categories from the server to ensure consistency
      fetchCategories().then(setCategories);
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6"><p>Loading categories...</p></div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
      <div className="space-y-4">
        {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="text-lg">{category.name}</span>
                <Button onClick={() => handleRemoveCategory(category.id)} variant="destructive">
                  Remove
                </Button>
              </div>
            ))
        ) : (
            <p>No categories found.</p>
        )}
      </div>
    </div>
  );
}
