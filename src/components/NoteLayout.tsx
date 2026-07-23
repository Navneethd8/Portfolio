"use client";

import React from 'react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Note } from '@/lib/notes';
import { FaCalendarAlt, FaTags, FaArrowLeft } from 'react-icons/fa';

interface NoteLayoutProps {
    note: Note;
}

export default function NoteLayout({ note }: NoteLayoutProps) {
    return (
        <div className="notes-terminal h-[calc(100vh-120px)] lg:h-[calc(100vh-64px)] flex flex-col border rounded-xl overflow-hidden transition-colors duration-200">
            {/* macOS Window Header */}
            <div className="font-mono flex items-center justify-center py-3 bg-[var(--note-header)] border-b border-[var(--note-border)] relative w-full">
                <div className="flex space-x-2 absolute left-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-[var(--note-muted)] font-medium tracking-wider truncate px-2 max-w-[calc(100%-120px)]">
                    <span className="hidden sm:inline">navneeth@portfolio: </span>~/notes/{note.slug}.md
                </div>
            </div>

            {/* Content */}
            <main className="font-sans flex-1 overflow-y-auto bg-[var(--note-bg)] custom-scrollbar">
                <div className="mx-auto max-w-4xl p-4 lg:p-12">
                    <Link
                        href="/notes"
                        className="font-mono no-underline mb-6 flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity text-sm"
                        style={{ color: 'var(--note-accent)' }}
                    >
                        <FaArrowLeft /> cd ..
                    </Link>

                    <div className="mb-10 text-left border-b border-[var(--note-border)] pb-6">
                        <div className="font-mono text-xs text-[var(--note-accent)] mb-3 flex items-center gap-2">
                            <Link href="/notes" className="no-underline opacity-75 hover:opacity-100 transition-opacity" style={{ color: 'var(--note-accent)' }}>~/notes</Link>
                            <span>/</span>
                            <Link href="/notes" className="no-underline opacity-75 hover:opacity-100 transition-opacity" style={{ color: 'var(--note-accent)' }}>{note.group}</Link>
                            {note.subgroup && (
                                <>
                                    <span>/</span>
                                    <span className="text-[var(--note-accent)] opacity-75">{note.subgroup}</span>
                                </>
                            )}
                            <span>/</span>
                            <span className="text-[var(--note-muted)]">{note.title}.md</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--note-heading)] leading-tight mb-4">{note.title}</h1>
                        <div className="flex flex-wrap items-center gap-4">
                            {note.date && (
                                <span className="flex items-center gap-1.5 text-xs text-[var(--note-muted)] border border-[var(--note-border)] px-2 py-1 bg-[var(--note-code-bg)]">
                                    <FaCalendarAlt className="text-[var(--note-accent)] opacity-75" /> {note.date}
                                </span>
                            )}
                            <div className="flex gap-2">
                                {note.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-[var(--note-code-bg)] text-[var(--note-muted)] text-[10px] border border-[var(--note-border)]">
                                        <FaTags className="scale-75 text-[var(--note-accent)] opacity-75" /> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <MarkdownRenderer html={note.html} />
                </div>
            </main>
        </div>
    );
}
