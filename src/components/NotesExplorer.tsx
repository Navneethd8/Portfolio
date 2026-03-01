"use client";

import React, { useState } from 'react';
import NotesSidebar from '@/components/NotesSidebar';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { NoteMetadata, Note } from '@/lib/notes';
import { FaBookOpen, FaCalendarAlt, FaTags, FaArrowLeft } from 'react-icons/fa';

interface NotesExplorerProps {
    initialNotes: NoteMetadata[];
    initialTags: string[];
}

export default function NotesExplorer({ initialNotes, initialTags }: NotesExplorerProps) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSlug, setActiveSlug] = useState<string | null>(null);
    const [mobileView, setMobileView] = useState<'sidebar' | 'content'>('sidebar');

    const handleSelectNote = async (slug: string) => {
        setActiveSlug(slug);
        setIsLoading(true);
        if (window.innerWidth < 1024) {
            setMobileView('content');
        }
        try {
            const res = await fetch(`/api/notes/${slug}`);
            const data = await res.json();
            setSelectedNote(data.note);
        } catch (error) {
            console.error("Failed to fetch note:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">

            {/* Internal Explorer Sidebar */}
            <div className={`w-full lg:w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 ${mobileView === 'content' ? 'hidden lg:flex' : 'flex'}`}>
                <NotesSidebar
                    notes={initialNotes}
                    activeSlug={activeSlug}
                    onSelectNote={handleSelectNote}
                    allTags={initialTags}
                />
            </div>

            {/* Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900 ${mobileView === 'sidebar' ? 'hidden lg:flex' : 'flex'}`}>
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : selectedNote ? (
                    <div className="p-4 lg:p-8 overflow-y-auto flex-1 custom-scrollbar">
                        <button
                            onClick={() => setMobileView('sidebar')}
                            className="lg:hidden mb-6 flex items-center gap-2 text-sm text-blue-500 font-medium"
                        >
                            <FaArrowLeft /> Back to list
                        </button>

                        <header className="mb-10">
                            <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-blue-500" />
                                    {selectedNote.date || "No date"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaTags className="text-blue-500" />
                                    <div className="flex gap-2">
                                        {selectedNote.tags.map(tag => (
                                            <span key={tag} className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                                {selectedNote.title}
                            </h1>
                        </header>

                        <MarkdownRenderer content={selectedNote.content} />
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500 dark:text-gray-400">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                            <FaBookOpen className="text-4xl text-gray-300 dark:text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Select a note to read</h2>
                        <p className="max-w-xs">
                            Browse your classes, interview prep, and personal notes using the explorer on the left.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
