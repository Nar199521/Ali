import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const conn = await pool.getConnection();
    try {
      let query = 'SELECT * FROM products';
      const params: any[] = [];

      if (categoryId) {
        query += ' WHERE category_id = ?';
        params.push(categoryId);
      }

      // LIMIT and OFFSET cannot use placeholders in MySQL, so concatenate directly
      query += ` LIMIT ${Math.max(0, limit)} OFFSET ${Math.max(0, offset)}`;

      const [rows] = await conn.execute(query, params);

      // Get images for each product
      const productsWithImages = await Promise.all(
        (rows as any[]).map(async (product: any) => {
          const [images] = await conn.execute(
            'SELECT url, alt_text FROM product_images WHERE product_id = ?',
            [product.id]
          );
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            originalPrice: parseFloat(product.price),
            categoryId: product.category_id,
            imageUrls: (images as any[]).length > 0 ? (images as any[]).map(img => img.url) : ['https://via.placeholder.com/300x300?text=NoImage'],
            stock: product.stock_quantity,
            sellerId: product.seller_id,
            published: true,
            rating: 4.5,
            sold: 0,
            store: { id: product.seller_id, name: 'Store' },
            createdAt: product.created_at,
          };
        })
      );

      return NextResponse.json({
        success: true,
        data: productsWithImages,
        total: (rows as any[]).length,
      });
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('Get products error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verify seller/admin (check session cookie)
    const sessionCookie = req.cookies.get('session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(sessionCookie.value);
    if (!user.isSeller && !user.isAdmin) {
      return NextResponse.json(
        { error: 'Only sellers and admins can add products' },
        { status: 403 }
      );
    }

    const { name, description, price, categoryId, imageUrls } = await req.json();

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, categoryId' },
        { status: 400 }
      );
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Insert product
      const [result] = await conn.execute(
        'INSERT INTO products (name, description, price, category_id, seller_id, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description || '', price, categoryId, user.id || 1, 100]
      );

      const productId = (result as any).insertId;

      // Insert product images
      if (imageUrls && Array.isArray(imageUrls)) {
        for (const url of imageUrls) {
          await conn.execute(
            'INSERT INTO product_images (product_id, url) VALUES (?, ?)',
            [productId, url]
          );
        }
      }

      await conn.commit();

      return NextResponse.json({
        success: true,
        productId,
        message: 'Product added successfully',
      });
    } catch (dbErr) {
      await conn.rollback();
      throw dbErr;
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('Create product error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
