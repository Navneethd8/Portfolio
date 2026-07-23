import React from 'react';
import SiteLayout from '@/components/siteLayout';
import NotesExplorer from '@/components/NotesExplorer';
import { getAllNotesMeta, getAllTags } from '@/lib/notes';

export default function NotesPage() {
    const notes = getAllNotesMeta();
    const tags = getAllTags(notes);

    return (
        <SiteLayout>
            <NotesExplorer initialNotes={notes} initialTags={tags} />
        </SiteLayout>
    );
}
