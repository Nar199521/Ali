import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';
import * as bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, name } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, username' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Create user
      const [userResult] = await conn.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      const userId = (userResult as any).insertId;

      await conn.commit();

      return NextResponse.json({
        success: true,
        userId,
        email,
        username,
        message: 'Signup successful. Please sign in.',
      });
    } catch (dbErr: any) {
      await conn.rollback();
      if (dbErr.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ error: 'Email or username already exists' }, { status: 409 });
      }
      throw dbErr;
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: err.message || 'Signup failed' }, { status: 500 });
  }
}
