import React from 'react';
import SiteLayout from '@/components/siteLayout';
import NotesExplorer from '@/components/NotesExplorer';
import { getAllNotesMeta, getAllTags } from '@/lib/notes';

export default function NotesPage() {
    const notes = getAllNotesMeta();
    const tags = getAllTags();

    return (
        <SiteLayout>
            <NotesExplorer initialNotes={notes} initialTags={tags} />
        </SiteLayout>
    );
}
