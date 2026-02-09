import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the path for the settings file
const settingsFilePath = path.join(process.cwd(), 'public', 'site-settings', 'banner-settings.json');

/**
 * @swagger
 * /api/settings/banner:
 *   get:
 *     description: Returns the current banner settings
 *     responses:
 *       200:
 *         description: The current banner settings
 *       500:
 *         description: Error reading settings
 */
export async function GET() {
    try {
        // Ensure the directory exists
        await fs.mkdir(path.dirname(settingsFilePath), { recursive: true });
        // Read the settings file
        const data = await fs.readFile(settingsFilePath, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            // If the file doesn't exist, return default settings
            return NextResponse.json({ title: '', imageUrl: '' });
        }
        console.error('Error reading banner settings:', error);
        return NextResponse.json({ message: 'Error reading settings' }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/settings/banner:
 *   post:
 *     description: Updates the banner settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Error saving settings
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, imageUrl } = body;

        if (typeof title === 'undefined' || typeof imageUrl === 'undefined') {
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        const settings = { title, imageUrl };

        // Ensure the directory exists
        await fs.mkdir(path.dirname(settingsFilePath), { recursive: true });
        
        // Write the new settings to the file
        await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2));

        return NextResponse.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error saving banner settings:', error);
        return NextResponse.json({ message: 'Error saving settings' }, { status: 500 });
    }
}
