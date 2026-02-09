'use server';

import { pool } from '@/lib/mysql';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import { join } from 'path';
import { slugify } from '@/lib/utils';

const publicPath = join(process.cwd(), 'public');
const categoryPagesPath = join(process.cwd(), 'src', 'app', 'category');

async function addCategory(formData: FormData) {
    let connection;
    try {
        const categoryName = formData.get('categoryName') as string;
        if (!categoryName) {
            throw new Error("Category name is required.");
        }

        connection = await pool.getConnection();
        await connection.beginTransaction();

        const subCategories: { name: string; image_url: string; }[] = [];
        const imageUploadPromises: Promise<void>[] = [];

        // First, process file uploads and prepare subCategory data
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('subCategories')) {
                const match = key.match(/subCategories\[(\d+)\]\[(name|image)\]/);
                if (match) {
                    const index = parseInt(match[1], 10);
                    const field = match[2];

                    if (!subCategories[index]) {
                        subCategories[index] = { name: '', image_url: '' };
                    }

                    if (field === 'name') {
                        subCategories[index].name = value as string;
                    } else if (field === 'image' && value instanceof File) {
                        const file = value as File;
                        const fileName = `${Date.now()}-${file.name}`;
                        const imagePath = join('images', 'categories', fileName);
                        const fullPath = join(publicPath, imagePath);
                        subCategories[index].image_url = `/${imagePath}`.replace(/\\/g, '/');

                        const buffer = Buffer.from(await file.arrayBuffer());
                        const uploadPromise = fs.mkdir(join(publicPath, 'images', 'categories'), { recursive: true })
                            .then(() => fs.writeFile(fullPath, buffer));
                        imageUploadPromises.push(uploadPromise);
                    }
                }
            }
        }
        
        // Wait for all images to be saved
        await Promise.all(imageUploadPromises);

        // Insert the main category
        const [result] = await connection.execute(
            'INSERT INTO categories (name, image_url, icon) VALUES (?, ?, ?)',
            [categoryName, subCategories.length > 0 ? subCategories[0].image_url : '', 'ShoppingBag']
        );
        const categoryId = (result as any).insertId;

        // Insert sub-categories
        if (subCategories.length > 0 && subCategories.some(s => s.name)) {
            const subCategoryValues = subCategories.map(s => [categoryId, s.name, s.image_url]);
            await connection.query(
                'INSERT INTO sub_categories (category_id, name, image_url) VALUES ?',
                [subCategoryValues]
            );
        }

        await connection.commit();

        // Statically create new category page - retaining existing pattern
        const categorySlug = slugify(categoryName);
        const categoryPageDir = join(categoryPagesPath, categorySlug);
        await fs.mkdir(categoryPageDir, { recursive: true });


        const categoryPageTemplate = `
    import { products, categories } from '@/lib/data'; // Note: This might need to fetch from DB in a real scenario
    import { ProductCard } from '@/components/product-card';
    import Image from 'next/image';
    import Link from 'next/link';

const Page = async () => {
  // This page is statically generated at build time or after category creation.
  // For dynamic data, you would fetch based on params.
  const categoryName = "${categoryName}";
  const subcategories = ${JSON.stringify(subCategories.map(s => ({...s, href: '#'})))};
  // In a fully dynamic system, you'd fetch these products from your DB
  const categoryProducts = []; 

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 xl:max-w-7xl xl:mx-auto xl:px-8">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">${categoryName}</h1>
        </div>

        <div className="mt-8 px-4 sm:px-6 lg:px-8 xl:px-0">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-y-10 gap-x-6">
                {subcategories.map((subcategory) => (
                <Link key={subcategory.name} href={subcategory.href} className="group text-center">
                    <div className="relative w-24 h-24 mx-auto">
                    <Image
                        src={subcategory.image_url}
                        alt={subcategory.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                    {subcategory.name}
                    </p>
                </Link>
                ))}
            </div>
        </div>

        <div className="mt-16 px-4 sm:px-6 lg:px-8 xl:px-0">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">More Ways to Shop</h2>
        </div>

        <div className="mt-6 px-4 sm:px-6 lg:px-8 xl:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {/* Product listing would go here */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
`;
        await fs.writeFile(join(categoryPageDir, 'page.tsx'), categoryPageTemplate, 'utf8');
        
        revalidatePath('/'); // Revalidate paths
        revalidatePath('/admin/manage-categories');

        return { success: true, message: 'Category added successfully!' };
    } catch (error) {
        if (connection) await connection.rollback();
        console.error(error);
        // Coerce error to a string for the return message
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message: `Failed to add category: ${errorMessage}` };
    } finally {
        if (connection) connection.release();
    }
}

export { addCategory };
