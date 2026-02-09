import { NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'home';
  const table = type === 'viva' ? 'viva_banners' : 'home_banners';

  const [rows] = await pool.query(`SELECT * FROM \`${table}\` ORDER BY id DESC`);
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'home';
  const table = type === 'viva' ? 'viva_banners' : 'home_banners';

  const body = await request.json();
  const { title, image_url, subtitle, button_text, button_link, background_color, is_active } = body;

  const [result]: any = await pool.query(
    `INSERT INTO \`${table}\` (title, image_url, subtitle, button_text, button_link, background_color, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, image_url, subtitle || null, button_text || null, button_link || null, background_color || null, is_active ? 1 : 0]
  );

  return NextResponse.json({ id: result.insertId });
}
