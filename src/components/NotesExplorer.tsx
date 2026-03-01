"use client";

import React, { useState, useMemo } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Note } from '@/lib/notes';
import { FaBookOpen, FaCalendarAlt, FaTags, FaArrowLeft, FaFolder, FaFileAlt, FaChevronRight, FaChevronDown } from 'react-icons/fa';

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
        <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-64px)] flex flex-col bg-[#0a0a0a] border border-[#333] rounded-xl overflow-hidden shadow-2xl font-mono text-gray-300">
            {/* macOS Window Header */}
            <div className="flex items-center justify-center py-3 bg-[#1a1a1a] border-b border-[#333] relative w-full">
                <div className="flex space-x-2 absolute left-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wider truncate px-2 max-w-[calc(100%-120px)]">
                    <span className="hidden sm:inline">navneeth@portfolio: </span>~/notes
                </div>
            </div>

            {/* Search Bar (Terminal Style) */}
            <div className="flex items-center px-4 py-3 border-b border-[#333] bg-[#0a0a0a]">
                <span className="text-green-500 mr-3 font-bold">❯</span>
                <input
                    type="search"
                    placeholder="grep -i 'search notes, tags, content...'"
                    className="flex-1 bg-transparent text-green-400 focus:outline-none placeholder-gray-600 text-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`w-full lg:w-72 flex-shrink-0 border-r border-[#333] bg-[#0d0d0d] overflow-y-auto custom-scrollbar ${mobileView === 'content' ? 'hidden lg:block' : 'block'}`}>
                    <div className="p-3 space-y-1">
                        <button
                            onClick={() => {
                                setActiveGroup("all");
                                setActiveNoteSlug(null);
                                setMobileView('sidebar');
                            }}
                            className={`w-full text-left px-3 py-2 transition-all flex items-center justify-between text-sm ${activeGroup === "all"
                                ? 'bg-[#1a1a1a] text-green-400 border-l-2 border-green-500'
                                : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200 border-l-2 border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <FaBookOpen className={activeGroup === "all" ? "text-green-500" : "text-gray-500"} /> ~/all_notes
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 ${activeGroup === "all" ? "text-green-400" : "text-gray-600"}`}>[{notes.length}]</span>
                        </button>

                        <div className="pt-6 pb-2 px-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                            <FaTags className="opacity-70" /> Tags
                        </div>

                        <div className="flex flex-wrap gap-2 px-3 pb-4">
                            {availableTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`px-2 py-1 text-[10px] transition-all flex items-center gap-1 border ${activeTag === tag
                                        ? 'bg-green-500/10 text-green-400 border-green-500/50'
                                        : 'bg-transparent text-gray-500 border-[#333] hover:border-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {tag === "all" ? "[all]" : `[${tag}]`}
                                </button>
                            ))}
                        </div>

                        <div className="pt-2 pb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-600">Directories</div>

                        {Object.keys(sidebarTree).sort().map((group) => {
                            const isExpanded = expandedGroups.has(group) || activeGroup === group;
                            const totalItems = sidebarTree[group].notes.length + Object.values(sidebarTree[group].subgroups).flat().length;

                            return (
                                <div key={group} className="space-y-0.5">
                                    <div className={`w-full transition-all flex items-center group flex-shrink-0 text-sm ${activeGroup === group
                                        ? 'bg-[#1a1a1a] text-green-400 border-l-2 border-green-500'
                                        : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200 border-l-2 border-transparent'
                                        }`}>
                                        <button
                                            onClick={(e) => toggleExpand(group, e)}
                                            className="px-2 py-2 text-gray-500 hover:text-gray-300 transition-colors"
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
                                            className="flex-1 flex items-center justify-between py-2 pr-3 truncate text-left"
                                        >
                                            <span className="flex items-center gap-2 truncate">
                                                <FaFolder className={activeGroup === group ? 'text-yellow-500/80' : 'text-yellow-600/50'} />
                                                {titleFromGroup(group)}/
                                            </span>
                                            <span className={`text-[10px] ${activeGroup === group ? "text-green-400" : "text-gray-600"}`}>[{totalItems}]</span>
                                        </button>
                                    </div>

                                    {isExpanded && (
                                        <div className="ml-5 border-l border-[#333] pl-2 space-y-0.5 my-1">
                                            {/* Subgroups */}
                                            {Object.keys(sidebarTree[group].subgroups).sort().map(sub => {
                                                const subKey = `${group}/${sub}`;
                                                const isSubExpanded = expandedGroups.has(subKey) || activeGroup === sub;

                                                return (
                                                    <div key={sub} className="space-y-0.5">
                                                        <div className={`w-full transition-all flex items-center text-sm ${activeGroup === sub
                                                            ? 'bg-[#1a1a1a] text-green-400 border-l-2 border-green-500'
                                                            : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200 border-l-2 border-transparent'
                                                            }`}>
                                                            <button
                                                                onClick={(e) => toggleExpand(subKey, e)}
                                                                className="px-2 py-1.5 text-gray-500 hover:text-gray-300 transition-colors"
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
                                                                className="flex-1 flex items-center gap-2 py-1.5 pr-3 truncate text-left"
                                                            >
                                                                <FaFolder className={activeGroup === sub ? 'text-yellow-500/80' : 'text-yellow-600/50'} />
                                                                <span className="truncate">{titleFromGroup(sub)}/</span>
                                                            </button>
                                                        </div>

                                                        {isSubExpanded && (
                                                            <div className="ml-5 border-l border-[#333] pl-2 space-y-0.5 my-1">
                                                                {sidebarTree[group].subgroups[sub].sort((a, b) => a.title.localeCompare(b.title)).map(note => (
                                                                    <button
                                                                        key={note.slug}
                                                                        onClick={() => handleSelectNote(note.slug)}
                                                                        className={`w-full text-left px-3 py-1.5 text-xs transition-all flex items-center gap-2 ${activeNoteSlug === note.slug
                                                                            ? 'bg-[#1a1a1a] text-green-400 border-l-2 border-green-500'
                                                                            : 'text-gray-500 hover:bg-[#1a1a1a] hover:text-gray-300 border-l-2 border-transparent'
                                                                            }`}
                                                                    >
                                                                        <FaFileAlt className={`flex-shrink-0 ${activeNoteSlug === note.slug ? 'text-green-500' : 'text-gray-600'}`} />
                                                                        <span className="truncate">{note.title}.md</span>
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
                                                    className={`w-full text-left px-3 py-1.5 text-xs transition-all flex items-center gap-2 ${activeNoteSlug === note.slug
                                                        ? 'bg-[#1a1a1a] text-green-400 border-l-2 border-green-500'
                                                        : 'text-gray-500 hover:bg-[#1a1a1a] hover:text-gray-300 border-l-2 border-transparent'
                                                        }`}
                                                >
                                                    <FaFileAlt className={`flex-shrink-0 ${activeNoteSlug === note.slug ? 'text-green-500' : 'text-gray-600'}`} />
                                                    <span className="truncate">{note.title}.md</span>
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
                <main className={`flex-1 overflow-y-auto bg-[#0a0a0a] custom-scrollbar ${mobileView === 'sidebar' ? 'hidden lg:block' : 'block'}`}>
                    {currentNote ? (
                        <div className="max-w-4xl mx-auto p-4 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <button
                                onClick={() => setMobileView('sidebar')}
                                className="lg:hidden mb-6 flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
                            >
                                <FaArrowLeft /> cd ..
                            </button>

                            <div className="mb-10 text-left border-b border-[#333] pb-6">
                                <div className="text-xs text-green-500/70 mb-3 flex items-center gap-2">
                                    <button onClick={() => { setActiveGroup(currentNote.group); setActiveNoteSlug(null); }} className="hover:text-green-400 transition-colors">~/{currentNote.group}</button>
                                    {currentNote.subgroup && (
                                        <>
                                            <span>/</span>
                                            <button onClick={() => { setActiveGroup(currentNote.group); setActiveNoteSlug(null); }} className="hover:text-green-400 transition-colors">{currentNote.subgroup}</button>
                                        </>
                                    )}
                                    <span>/</span>
                                    <span className="text-gray-400">{currentNote.title}.md</span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-100 leading-tight mb-4">{currentNote.title}</h1>
                                <div className="flex flex-wrap items-center gap-4">
                                    {currentNote.date && (
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500 border border-[#333] px-2 py-1 bg-[#121212]">
                                            <FaCalendarAlt className="text-green-500/70" /> {currentNote.date}
                                        </span>
                                    )}
                                    <div className="flex gap-2">
                                        {currentNote.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-[#121212] text-gray-400 text-[10px] border border-[#333]">
                                                <FaTags className="scale-75 text-green-500/70" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-pre:bg-[#121212] prose-pre:border prose-pre:border-[#333] prose-p:text-gray-300 prose-headings:text-gray-100 prose-a:text-green-400 prose-strong:text-gray-200 marker:text-green-500 max-w-none">
                                <MarkdownRenderer html={currentNote.html} />
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 lg:p-8">
                            {Object.entries(displayGroups).map(([group, groupNotes]) => (
                                <div key={group} className="mb-12">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-green-500 mb-6 border-b border-[#333] pb-2 flex items-center gap-2">
                                        <FaFolder className="text-yellow-500/80" /> ~/{titleFromGroup(group)}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {groupNotes.map((note) => (
                                            <button
                                                key={note.slug}
                                                onClick={() => handleSelectNote(note.slug)}
                                                className="group text-left p-5 bg-[#121212] border border-[#333] hover:border-green-500 transition-all relative overflow-hidden h-[240px] flex flex-col"
                                            >
                                                <div className="relative flex flex-col h-full w-full">
                                                    <div className="text-[10px] text-green-500/70 mb-2 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
                                                        <FaFileAlt /> {note.subgroup || note.group}/{note.slug}.md
                                                    </div>
                                                    <h4 className="text-lg font-bold text-gray-200 mb-3 group-hover:text-green-400 transition-colors line-clamp-2 flex-shrink-0">{note.title}</h4>
                                                    <p className="text-xs text-gray-500 line-clamp-3 mb-4 flex-1">
                                                        <span className="text-green-500 mr-2">$</span>
                                                        cat {note.slug}.md | head -n 3<br />
                                                        <span className="text-gray-400 mt-1 block">{note.snippet}</span>
                                                    </p>
                                                    <div className="flex gap-2 flex-wrap flex-shrink-0">
                                                        {note.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="px-2 py-0.5 bg-[#0a0a0a] border border-[#333] text-[10px] text-gray-400 group-hover:text-green-400 transition-colors uppercase tracking-wider truncate max-w-full">[{tag}]</span>
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
                                    <div className="text-6xl mb-4 text-[#333]">_</div>
                                    <h3 className="text-sm font-bold text-green-500 font-mono">Process completed with exit code 1.</h3>
                                    <p className="text-xs text-gray-500 mt-2">No notes found matching your grep query.</p>
                                    <button onClick={() => { setQuery(""); setActiveTag("all"); setActiveGroup("all"); }} className="mt-6 px-4 py-2 bg-[#121212] border border-[#333] text-green-500 text-xs hover:bg-[#1a1a1a] transition-colors">
                                        clear
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
