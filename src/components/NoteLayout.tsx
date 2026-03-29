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
        <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-64px)] flex flex-col bg-[#0a0a0a] border border-[#333] rounded-xl overflow-hidden shadow-2xl font-mono text-gray-300">
            {/* macOS Window Header */}
            <div className="flex items-center justify-center py-3 bg-[#1a1a1a] border-b border-[#333] relative w-full">
                <div className="flex space-x-2 absolute left-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wider truncate px-2 max-w-[calc(100%-120px)]">
                    <span className="hidden sm:inline">navneeth@portfolio: </span>~/notes/{note.slug}.md
                </div>
            </div>

            {/* Content */}
            <main className="flex-1 overflow-y-auto bg-[#0a0a0a] custom-scrollbar">
                <div className="max-w-4xl mx-auto p-4 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Link
                        href="/notes"
                        className="no-underline mb-6 flex items-center gap-2 hover:text-green-400 transition-colors text-sm"
                        style={{ color: '#22c55e' }}
                    >
                        <FaArrowLeft /> cd ..
                    </Link>

                    <div className="mb-10 text-left border-b border-[#333] pb-6">
                        <div className="text-xs text-green-500/70 mb-3 flex items-center gap-2">
                            <Link href="/notes" className="no-underline hover:text-green-400 transition-colors" style={{ color: 'rgba(34,197,94,0.7)' }}>~/notes</Link>
                            <span>/</span>
                            <Link href="/notes" className="no-underline hover:text-green-400 transition-colors" style={{ color: 'rgba(34,197,94,0.7)' }}>{note.group}</Link>
                            {note.subgroup && (
                                <>
                                    <span>/</span>
                                    <span className="text-green-500/70">{note.subgroup}</span>
                                </>
                            )}
                            <span>/</span>
                            <span className="text-gray-400">{note.title}.md</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-100 leading-tight mb-4">{note.title}</h1>
                        <div className="flex flex-wrap items-center gap-4">
                            {note.date && (
                                <span className="flex items-center gap-1.5 text-xs text-gray-500 border border-[#333] px-2 py-1 bg-[#121212]">
                                    <FaCalendarAlt className="text-green-500/70" /> {note.date}
                                </span>
                            )}
                            <div className="flex gap-2">
                                {note.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-[#121212] text-gray-400 text-[10px] border border-[#333]">
                                        <FaTags className="scale-75 text-green-500/70" /> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-pre:bg-[#121212] prose-pre:border prose-pre:border-[#333] prose-p:text-gray-300 prose-headings:text-gray-100 prose-a:text-green-400 prose-strong:text-gray-200 marker:text-green-500 max-w-none">
                        <MarkdownRenderer html={note.html} />
                    </div>
                </div>
            </main>
        </div>
    );
}
