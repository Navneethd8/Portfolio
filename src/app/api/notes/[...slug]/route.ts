import { NextRequest, NextResponse } from 'next/server';
import { getNoteBySlug } from '@/lib/notes';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    try {
        const { slug } = await params;
        const slugPath = slug.join('/');
        const note = await getNoteBySlug(slugPath);

        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        return NextResponse.json({ note });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 });
    }
}
