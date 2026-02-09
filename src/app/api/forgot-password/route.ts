import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const usersFilePath = path.resolve(process.cwd(), 'src/data/users.json');
const passwordResetsFilePath = path.resolve(process.cwd(), 'src/data/password-resets.json');

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const user = users.find((user: any) => user.email === email);

    if (!user) {
      // Don't reveal that the user doesn't exist
      return NextResponse.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    const passwordResets = JSON.parse(fs.readFileSync(passwordResetsFilePath, 'utf-8'));
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour

    passwordResets.push({ email, token, expires });
    fs.writeFileSync(passwordResetsFilePath, JSON.stringify(passwordResets, null, 2));

    // In a real app, you'd send an email here with a link like: /reset-password?token=${token}

    return NextResponse.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
