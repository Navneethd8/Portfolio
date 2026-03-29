import React from 'react';
import { notFound } from 'next/navigation';
import SiteLayout from '@/components/siteLayout';
import NoteLayout from '@/components/NoteLayout';
import { getNoteBySlug, getAllNotesMeta } from '@/lib/notes';

interface NotePageProps {
    params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    const notes = getAllNotesMeta();
    return notes.map((note) => ({
        slug: note.slug.split('/'),
    }));
}

export default async function NotePage({ params }: NotePageProps) {
    const { slug } = await params;
    const slugPath = slug.map(s => decodeURIComponent(s)).join('/');
    const note = await getNoteBySlug(slugPath);

    if (!note) {
        notFound();
    }

    return (
        <SiteLayout>
            <NoteLayout note={note} />
        </SiteLayout>
    );
}

