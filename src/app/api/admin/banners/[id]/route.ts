import { NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'home';
  const table = type === 'viva' ? 'viva_banners' : 'home_banners';

  const body = await request.json();
  const { title, image_url, subtitle, button_text, button_link, background_color, is_active } = body;

  const [result]: any = await pool.query(
    `UPDATE \`${table}\` SET title = ?, image_url = ?, subtitle = ?, button_text = ?, button_link = ?, background_color = ?, is_active = ? WHERE id = ?`,
    [title, image_url, subtitle || null, button_text || null, button_link || null, background_color || null, is_active ? 1 : 0, id]
  );

  return NextResponse.json({ affectedRows: result.affectedRows });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'home';
  const table = type === 'viva' ? 'viva_banners' : 'home_banners';

  const [result]: any = await pool.query(`DELETE FROM \`${table}\` WHERE id = ?`, [id]);
  return NextResponse.json({ affectedRows: result.affectedRows });
}
