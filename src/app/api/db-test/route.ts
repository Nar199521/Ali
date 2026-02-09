import { NextResponse } from 'next/server';
import { pool } from '../../../lib/mysql';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    return NextResponse.json({ ok: true, rows });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
