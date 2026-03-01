import React from 'react';
import SiteLayout from '@/components/siteLayout';
import NotesExplorer from '@/components/NotesExplorer';
import { getAllNotes, getAllTags } from '@/lib/notes';

export default async function NotesPage() {
    // Fetch data on the server
    const notes = await getAllNotes();
    const tags = await getAllTags();

    return (
        <SiteLayout>
            <NotesExplorer initialNotes={notes} initialTags={tags} />
        </SiteLayout>
    );
}
