import { NextResponse } from 'next/server';
import { pool } from '../../../lib/mysql';

export async function GET() {
  try {
    const [tablesRows] = await pool.query('SHOW TABLES');
    const tables = (tablesRows as any[]).map(r => Object.values(r)[0]);

    const sample: Record<string, unknown> = {};
    if (tables.length > 0) {
      const first = String(tables[0]);
      const [rows] = await pool.query(`SELECT * FROM \`${first}\` LIMIT 5`);
      sample[first] = rows;
    }

    return NextResponse.json({ ok: true, tables, sample });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
