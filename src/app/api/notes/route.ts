import { NextResponse } from 'next/server';
import { getAllNotes, getAllTags } from '@/lib/notes';

export async function GET() {
    try {
        const notes = await getAllNotes();
        const tags = await getAllTags();
        return NextResponse.json({ notes, tags });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    }
}
