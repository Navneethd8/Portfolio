import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const NOTES_DIRECTORY = path.join(process.cwd(), 'notes');

// Recursively search for a file in the notes directory
function findFile(dir: string, targetName: string): string | null {
    if (!fs.existsSync(dir)) return null;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const found = findFile(fullPath, targetName);
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

    const filePath = findFile(NOTES_DIRECTORY, decodedFilename);

    if (!filePath) {
        return new NextResponse('Not found', { status: 404 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(new Uint8Array(fileBuffer), {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
