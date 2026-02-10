import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';
import * as bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const conn = await pool.getConnection();
    try {
      // Try regular users first
      const [userRows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
      let user = (userRows as any[])[0];

      // If not found in users, try admins table
      let isAdminAccount = false;
      if (!user) {
        const [adminRows] = await conn.execute('SELECT * FROM admins WHERE email = ?', [email]);
        user = (adminRows as any[])[0];
        if (user) isAdminAccount = true;
      }

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }

      // Create session object (exclude password)
      const sessionUser = {
        id: user.id,
        username: user.username || user.name || null,
        email: user.email,
        role: isAdminAccount ? 'admin' : (user.role || 'user'),
        isSeller: (user.role === 'seller'),
        isAdmin: isAdminAccount || user.role === 'admin',
      };

      // Set session cookie
      const response = NextResponse.json({
        success: true,
        user: sessionUser,
        message: 'Sign in successful',
      });

      response.cookies.set('session', JSON.stringify(sessionUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('Signin error:', err);
    return NextResponse.json({ error: err.message || 'Sign in failed' }, { status: 500 });
  }
}
