import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.resolve(process.cwd(), 'src/data/users.json');
const passwordResetsFilePath = path.resolve(process.cwd(), 'src/data/password-resets.json');

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    const passwordResets = JSON.parse(fs.readFileSync(passwordResetsFilePath, 'utf-8'));
    const resetRequest = passwordResets.find((req: any) => req.token === token && req.expires > Date.now());

    if (!resetRequest) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const userIndex = users.findIndex((user: any) => user.email === resetRequest.email);

    if (userIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    users[userIndex].password = password; // In a real app, you should hash the password
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // Remove the used token
    const updatedResets = passwordResets.filter((req: any) => req.token !== token);
    fs.writeFileSync(passwordResetsFilePath, JSON.stringify(updatedResets, null, 2));

    return NextResponse.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
