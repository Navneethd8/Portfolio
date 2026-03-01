import React from 'react';
import SiteLayout from '@/components/siteLayout';
import NotesExplorer from '@/components/NotesExplorer';
import { getAllNotes, getAllTags } from '@/lib/notes';
import TypewriterText from "@/components/TypewriterText";
import { MdEmail } from "react-icons/md";

export default async function NotesPage() {
    // Fetch data on the server
    const notes = await getAllNotes();
    const tags = await getAllTags();

    const sidebarContent = (
        <div className="flex flex-col h-full w-full">
            <div className="flex-shrink-0 mb-8 lg:mb-4 text-center lg:text-left pt-4 lg:pt-0">
                <h1 className="hidden lg:block text-2xl font-semibold mb-2 text-[var(--background)]">Navneeth Dhamotharan</h1>
                <p className="text-[var(--background)] text-xl lg:text-lg font-medium">
                    <TypewriterText titles={["Data Scientist", "Software Engineer", "Economist"]} />
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <nav className="flex flex-col gap-6 lg:gap-2 text-center lg:text-left lg:pr-2 lg:flex-grow">
                    <a href="/" className="px-4 py-2 lg:py-1 text-2xl lg:text-xl text-[var(--sidebar-link)] hover:text-[var(--link-hover)]">Home</a>
                    <a href="/notes" className="px-4 py-2 lg:py-1 text-2xl lg:text-xl text-[var(--link-hover)] border-l-2 border-[var(--link-hover)] lg:pl-3">Notes</a>
                </nav>

                <div className="mt-8 lg:mt-0 text-center lg:text-left">
                    <p className="text-[var(--background)] text-2xl lg:text-xl font-medium">Get In Touch</p>
                </div>
                <nav className="flex flex-col gap-6 lg:gap-2 items-center lg:items-start lg:pr-2 lg:flex-grow">
                    <a href="mailto:nd17@uw.edu" className="px-4 py-2 lg:py-1 text-2xl lg:text-xl flex flex-row items-center gap-4 lg:gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                        <MdEmail />
                        <span>nd17@uw.edu</span>
                    </a>
                </nav>
            </div>
        </div>
    );

    return (
        <SiteLayout sidebar={sidebarContent}>
            <NotesExplorer initialNotes={notes} initialTags={tags} />
        </SiteLayout>
    );
}
