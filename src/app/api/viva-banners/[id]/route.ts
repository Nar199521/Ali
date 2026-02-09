import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';
import { cookies } from 'next/headers';

// Delete a viva banner (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'DELETE FROM viva_banners WHERE id = ?',
      [id]
    );
    connection.release();

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting viva banner:', error);
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    );
  }
}
