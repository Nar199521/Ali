import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';
import { cookies } from 'next/headers';

// Get all active home banners
export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [banners] = await connection.execute(
      'SELECT * FROM home_banners WHERE is_active = TRUE ORDER BY created_at DESC'
    );
    connection.release();

    return NextResponse.json({ data: banners }, { status: 200 });
  } catch (error) {
    console.error('Error fetching home banners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}

// Create new home banner (admin only)
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, verify session and check admin role
    const body = await req.json();
    const { title, image_url, subtitle, button_text, button_link, background_color } = body;

    if (!title || !image_url) {
      return NextResponse.json(
        { error: 'Title and image_url are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `INSERT INTO home_banners (title, image_url, subtitle, button_text, button_link, background_color)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, image_url, subtitle || null, button_text || null, button_link || null, background_color || null]
    );
    connection.release();

    return NextResponse.json(
      { id: (result as any).insertId, title, image_url, subtitle, button_text, button_link, background_color },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating home banner:', error);
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    );
  }
}
