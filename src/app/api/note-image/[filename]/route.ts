import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const NOTES_DIRECTORY = path.join(process.cwd(), 'notes');

async function findFile(dir: string, targetName: string): Promise<string | null> {
    try {
        await fs.access(dir);
    } catch {
        return null;
    }

    let entries;
    try {
        entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
        return null;
    }

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const found = await findFile(fullPath, targetName);
            if (found) return found;
        } else if (entry.name === targetName) {
            return fullPath;
        }
    }
    return null;
}

const MIME_TYPES: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.pdf': 'application/pdf',
};

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const { filename } = await params;
    const decodedFilename = decodeURIComponent(filename);

    // Security: prevent directory traversal
    if (decodedFilename.includes('..') || decodedFilename.includes('/')) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    const filePath = await findFile(NOTES_DIRECTORY, decodedFilename);

    if (!filePath) {
        return new NextResponse('Not found', { status: 404 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
        const fileBuffer = await fs.readFile(filePath);

        return new NextResponse(new Uint8Array(fileBuffer), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error(`Failed to read file ${filePath}:`, error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
