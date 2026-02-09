'use server';

import { pool } from '@/lib/mysql';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import { join } from 'path';
import { slugify } from '@/lib/utils';

const categoryPagesPath = join(process.cwd(), 'src', 'app', 'category');

export async function removeCategory(categoryId: number) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // First, get the category name to delete the corresponding static page directory
        const [rows] = await connection.execute('SELECT name FROM categories WHERE id = ?', [categoryId]);
        
        // Explicitly type rows to inform TypeScript about its structure
        const typedRows = rows as { name: string }[];

        if (typedRows.length === 0) {
            return { success: false, message: 'Category not found.' };
        }
        const categoryName = typedRows[0].name;

        // Delete sub-categories associated with the category
        await connection.execute('DELETE FROM sub_categories WHERE category_id = ?', [categoryId]);

        // Delete the main category
        const [deleteResult] = await connection.execute('DELETE FROM categories WHERE id = ?', [categoryId]);

        await connection.commit();

        // Check if any row was actually deleted
        if ((deleteResult as any).affectedRows > 0) {
            // Statically remove the category page directory
            const categorySlug = slugify(categoryName);
            const categoryDirPath = join(categoryPagesPath, categorySlug);
            try {
                await fs.rm(categoryDirPath, { recursive: true, force: true });
            } catch (dirError) {
                // Log if directory deletion fails but don't fail the whole operation
                console.error(`Failed to delete directory ${categoryDirPath}:`, dirError);
            }
            
            revalidatePath('/admin/manage-categories');
            revalidatePath('/');

            return { success: true, message: 'Category removed successfully.' };
        } else {
            return { success: false, message: 'Category could not be removed or was already deleted.' };
        }
    } catch (error) {
        if (connection) await connection.rollback();
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message: `Failed to remove category: ${errorMessage}` };
    } finally {
        if (connection) connection.release();
    }
}
