"use client";

import React, { useState, useMemo } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Note } from '@/lib/notes';
import { FaBookOpen, FaCalendarAlt, FaTags, FaArrowLeft, FaSearch, FaFolder, FaFileAlt, FaChevronRight, FaChevronDown } from 'react-icons/fa';

interface NotesExplorerProps {
    initialNotes: Note[];
    initialTags: string[];
}

export default function NotesExplorer({ initialNotes: notes, initialTags: allTags }: NotesExplorerProps) {
    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState("all");
    const [activeGroup, setActiveGroup] = useState("all");
    const [activeNoteSlug, setActiveNoteSlug] = useState<string | null>(null);
    const [mobileView, setMobileView] = useState<'sidebar' | 'content'>('sidebar');
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    const toggleExpand = (group: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedGroups(prev => {
            const next = new Set(prev);
            if (next.has(group)) next.delete(group);
            else next.add(group);
            return next;
        });
    };

    const availableTags = useMemo(() => ["all", ...allTags], [allTags]);

    const sidebarTree = useMemo(() => {
        const tree: Record<string, { notes: Note[], subgroups: Record<string, Note[]> }> = {};

        notes.forEach(note => {
            if (!tree[note.group]) {
                tree[note.group] = { notes: [], subgroups: {} };
            }
            if (note.subgroup) {
                if (!tree[note.group].subgroups[note.subgroup]) {
                    tree[note.group].subgroups[note.subgroup] = [];
                }
                tree[note.group].subgroups[note.subgroup].push(note);
            } else {
                tree[note.group].notes.push(note);
            }
        });
        return tree;
    }, [notes]);


    const filteredNotes = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return notes.filter((note) => {
            const matchesTag = activeTag === "all" || note.tags.includes(activeTag);
            const matchesGroup = activeGroup === "all" || note.group === activeGroup || note.subgroup === activeGroup;
            if (!matchesTag || !matchesGroup) return false;
            if (!normalizedQuery) return true;
            const haystack = `${note.title} ${note.snippet} ${note.tags.join(" ")}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [notes, query, activeTag, activeGroup]);

    const displayGroups = useMemo(() => {
        return filteredNotes.reduce((acc, note) => {
            // If the user actively selected a subgroup, we group by that subgroup
            // Otherwise, we group by the top-level group
            const key = activeGroup !== "all" && note.subgroup === activeGroup ? note.subgroup : note.group;
            if (!acc[key]) acc[key] = [];
            acc[key].push(note);
            return acc;
        }, {} as Record<string, Note[]>);
    }, [filteredNotes, activeGroup]);

    const currentNote = useMemo(() => {
        if (!activeNoteSlug) return null;
        return notes.find((note) => note.slug === activeNoteSlug) || null;
    }, [notes, activeNoteSlug]);

    const titleFromGroup = (group: string) =>
        group
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

    const handleSelectNote = (slug: string) => {
        setActiveNoteSlug(slug);
        setMobileView('content');
    };

    return (
        <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-64px)] flex flex-col bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header Controls */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative flex-1 group">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="search"
                            placeholder="Search notes, tags, content..."
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-[var(--foreground)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[var(--foreground)]/30"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`w-full lg:w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 overflow-y-auto custom-scrollbar ${mobileView === 'content' ? 'hidden lg:block' : 'block'}`}>
                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => {
                                setActiveGroup("all");
                                setActiveNoteSlug(null);
                                setMobileView('sidebar');
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${activeGroup === "all"
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-blue-400'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <FaBookOpen className={activeGroup === "all" ? "text-blue-500" : "text-gray-400"} /> All Notes
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeGroup === "all" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>{notes.length}</span>
                        </button>

                        <div className="pt-6 pb-3 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <FaTags className="opacity-70" /> Tags
                        </div>

                        <div className="flex flex-wrap gap-2 px-2 pb-2">
                            {availableTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${activeTag === tag
                                        ? 'bg-blue-500 text-white shadow-md border border-blue-500'
                                        : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-500'
                                        }`}
                                >
                                    {tag === "all" ? (
                                        "All Tags"
                                    ) : (
                                        <>
                                            <span className="opacity-50">#</span>{tag}
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="pt-4 pb-2 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">Categories</div>

                        {Object.keys(sidebarTree).sort().map((group) => {
                            const isExpanded = expandedGroups.has(group) || activeGroup === group;
                            const totalItems = sidebarTree[group].notes.length + Object.values(sidebarTree[group].subgroups).flat().length;

                            return (
                                <div key={group} className="space-y-1">
                                    <div className={`w-full rounded-xl transition-all flex items-center group flex-shrink-0 ${activeGroup === group
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-blue-400'
                                        }`}>
                                        <button
                                            onClick={(e) => toggleExpand(group, e)}
                                            className="px-2 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-l-xl text-gray-400 transition-colors"
                                            aria-label="Toggle Folder"
                                        >
                                            {isExpanded ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                setActiveGroup(group);
                                                setActiveNoteSlug(null);
                                                setMobileView('sidebar');
                                                if (!expandedGroups.has(group)) {
                                                    toggleExpand(group, e);
                                                }
                                            }}
                                            className="flex-1 flex items-center justify-between py-2 pr-2 truncate text-left"
                                        >
                                            <span className="flex items-center gap-2 truncate">
                                                <FaFolder className={activeGroup === group ? 'text-blue-500' : 'text-gray-400'} />
                                                {titleFromGroup(group)}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeGroup === group ? "text-blue-500 font-medium" : "opacity-60"}`}>{totalItems}</span>
                                        </button>
                                    </div>

                                    {isExpanded && (
                                        <div className="ml-5 border-l border-gray-200 dark:border-gray-700 pl-2 space-y-1 my-1">
                                            {/* Subgroups */}
                                            {Object.keys(sidebarTree[group].subgroups).sort().map(sub => {
                                                const subKey = `${group}/${sub}`;
                                                const isSubExpanded = expandedGroups.has(subKey) || activeGroup === sub;

                                                return (
                                                    <div key={sub} className="space-y-1">
                                                        <div className={`w-full rounded-lg transition-all flex items-center ${activeGroup === sub
                                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold'
                                                            : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                                            }`}>
                                                            <button
                                                                onClick={(e) => toggleExpand(subKey, e)}
                                                                className="px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-l-lg text-gray-400 transition-colors"
                                                                aria-label="Toggle Folder"
                                                            >
                                                                {isSubExpanded ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    setActiveGroup(sub);
                                                                    setActiveNoteSlug(null);
                                                                    setMobileView('sidebar');
                                                                    if (!expandedGroups.has(subKey)) {
                                                                        toggleExpand(subKey, e);
                                                                    }
                                                                }}
                                                                className="flex-1 flex items-center gap-2 py-1.5 pr-2 truncate text-left text-sm"
                                                            >
                                                                <FaFolder className={activeGroup === sub ? 'text-blue-500' : 'text-gray-400'} />
                                                                <span className="truncate">{titleFromGroup(sub)}</span>
                                                            </button>
                                                        </div>

                                                        {isSubExpanded && (
                                                            <div className="ml-5 border-l border-gray-200 dark:border-gray-700 pl-2 space-y-0.5 my-1">
                                                                {sidebarTree[group].subgroups[sub].sort((a, b) => a.title.localeCompare(b.title)).map(note => (
                                                                    <button
                                                                        key={note.slug}
                                                                        onClick={() => handleSelectNote(note.slug)}
                                                                        className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-2 ${activeNoteSlug === note.slug
                                                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold'
                                                                            : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                                                            }`}
                                                                    >
                                                                        <FaFileAlt className={`flex-shrink-0 ${activeNoteSlug === note.slug ? 'text-blue-500' : 'text-gray-400'}`} />
                                                                        <span className="truncate">{note.title}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                            {/* Direct Notes in Group */}
                                            {sidebarTree[group].notes.sort((a, b) => a.title.localeCompare(b.title)).map(note => (
                                                <button
                                                    key={note.slug}
                                                    onClick={() => handleSelectNote(note.slug)}
                                                    className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-2 ${activeNoteSlug === note.slug
                                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold'
                                                        : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                                        }`}
                                                >
                                                    <FaFileAlt className={`flex-shrink-0 ${activeNoteSlug === note.slug ? 'text-blue-500 w-3 h-3' : 'text-gray-400 w-3 h-3'}`} />
                                                    <span className="truncate">{note.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Content */}
                <main className={`flex-1 overflow-y-auto bg-white dark:bg-[#1A1A1A] custom-scrollbar ${mobileView === 'sidebar' ? 'hidden lg:block' : 'block'}`}>
                    {currentNote ? (
                        <div className="max-w-4xl mx-auto p-4 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <button
                                onClick={() => setMobileView('sidebar')}
                                className="lg:hidden mb-6 flex items-center gap-2 text-[var(--link-hover)]"
                            >
                                <FaArrowLeft /> Back to list
                            </button>

                            <div className="mb-10 text-center lg:text-left">
                                <div className="text-sm font-semibold text-blue-500 mb-2 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1">
                                    <button onClick={() => { setActiveGroup(currentNote.group); setActiveNoteSlug(null); }} className="hover:underline">{currentNote.group}</button>
                                    {currentNote.subgroup && (
                                        <>
                                            <span>›</span>
                                            <button onClick={() => { setActiveGroup(currentNote.group); setActiveNoteSlug(null); }} className="hover:underline">{currentNote.subgroup}</button>
                                        </>
                                    )}
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight mb-6">{currentNote.title}</h1>
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                    {currentNote.date && (
                                        <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                            <FaCalendarAlt className="text-blue-500" /> {currentNote.date}
                                        </span>
                                    )}
                                    <div className="flex gap-2">
                                        {currentNote.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800">
                                                <FaTags className="scale-75" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <MarkdownRenderer html={currentNote.html} />
                        </div>
                    ) : (
                        <div className="p-4 lg:p-8">
                            {Object.entries(displayGroups).map(([group, groupNotes]) => (
                                <div key={group} className="mb-12">
                                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">{titleFromGroup(group)}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {groupNotes.map((note) => (
                                            <button
                                                key={note.slug}
                                                onClick={() => handleSelectNote(note.slug)}
                                                className="group text-left p-6 bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden h-[240px] flex flex-col"
                                            >
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-500" />
                                                <div className="relative flex flex-col h-full w-full">
                                                    <div className="text-xs font-semibold text-blue-500 mb-2 uppercase tracking-wider flex-shrink-0">{note.subgroup || note.group}</div>
                                                    <h4 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-blue-500 transition-colors line-clamp-2 flex-shrink-0">{note.title}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed flex-1">{note.snippet}</p>
                                                    <div className="flex gap-2 flex-wrap flex-shrink-0">
                                                        {note.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[10px] rounded-full font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider truncate max-w-full">#{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {filteredNotes.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-4 text-gray-300">🔍</div>
                                    <h3 className="text-xl font-bold text-gray-500">No notes found matching your filters</h3>
                                    <button onClick={() => { setQuery(""); setActiveTag("all"); setActiveGroup("all"); }} className="mt-4 text-[var(--link-hover)] hover:underline">Clear all filters</button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
