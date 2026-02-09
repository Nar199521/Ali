import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(sessionCookie.value);

    const conn = await pool.getConnection();
    try {
      const [orders] = await conn.execute(
        'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
        [user.id]
      );

      return NextResponse.json({
        success: true,
        data: orders,
      });
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('Get orders error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(sessionCookie.value);
    const { cartItems, total } = await req.json();

    if (!cartItems || !Array.isArray(cartItems)) {
      return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 });
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Create order
      const [orderResult] = await conn.execute(
        'INSERT INTO orders (user_id, total, currency, status) VALUES (?, ?, ?, ?)',
        [user.id, total, 'BDT', 'pending']
      );

      const orderId = (orderResult as any).insertId;

      // Create order items
      for (const item of cartItems) {
        await conn.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.productId, item.quantity, item.price]
        );
      }

      await conn.commit();

      return NextResponse.json({
        success: true,
        orderId,
        amount: total,
        message: 'Order created successfully',
      });
    } catch (dbErr) {
      await conn.rollback();
      throw dbErr;
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('Create order error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
