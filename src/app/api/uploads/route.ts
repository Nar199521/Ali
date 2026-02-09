import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(sessionCookie.value);

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'default');

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      return NextResponse.json(
        { error: 'Cloudinary not configured' },
        { status: 500 }
      );
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const cloudResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    if (!cloudResponse.ok) {
      const err = await cloudResponse.json();
      throw new Error(err.error?.message || 'Cloudinary upload failed');
    }

    const cloudData = await cloudResponse.json();
    const imageUrl = cloudData.secure_url;

    // Save record to DB
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute(
        'INSERT INTO uploads (user_id, filename, url, mime_type, size) VALUES (?, ?, ?, ?, ?)',
        [user.id, file.name, imageUrl, file.type, file.size]
      );

      return NextResponse.json({
        success: true,
        uploadId: (result as any).insertId,
        url: imageUrl,
        filename: file.name,
      });
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
