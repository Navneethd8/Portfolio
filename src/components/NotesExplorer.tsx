"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { NoteMetadata } from '@/lib/notes';
import { FaBookOpen, FaTags, FaFolder, FaFileAlt, FaChevronRight, FaChevronDown } from 'react-icons/fa';

interface NotesExplorerProps {
    initialNotes: NoteMetadata[];
    initialTags: string[];
}

function titleFromGroup(group: string) {
    return group
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function NotesExplorer({ initialNotes: notes, initialTags: allTags }: NotesExplorerProps) {
    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState("all");
    const [activeGroup, setActiveGroup] = useState("all");
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
        const tree: Record<string, { notes: NoteMetadata[], subgroups: Record<string, NoteMetadata[]> }> = {};

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
            const key = activeGroup !== "all" && note.subgroup === activeGroup ? note.subgroup : note.group;
            if (!acc[key]) acc[key] = [];
            acc[key].push(note);
            return acc;
        }, {} as Record<string, NoteMetadata[]>);
    }, [filteredNotes, activeGroup]);

    return (
        <div className="notes-terminal h-[calc(100vh-120px)] lg:h-[calc(100vh-64px)] flex flex-col border rounded-xl overflow-hidden font-mono transition-colors duration-200">
            {/* macOS Window Header */}
            <div className="flex items-center justify-center py-3 bg-[var(--note-header)] border-b border-[var(--note-border)] relative w-full">
                <div className="flex space-x-2 absolute left-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-[var(--note-muted)] font-medium tracking-wider truncate px-2 max-w-[calc(100%-120px)]">
                    <span className="hidden sm:inline">navneeth@portfolio: </span>~/notes
                </div>
            </div>

            {/* Search Bar (Terminal Style) */}
            <div className="flex items-center px-4 py-3 border-b border-[var(--note-border)] bg-[var(--note-bg)]">
                <label
                    htmlFor="notes-search"
                    className="mr-3 flex items-center gap-2 text-xs font-bold text-[var(--note-accent)]"
                >
                    <span aria-hidden>❯</span>
                    <span>grep</span>
                </label>
                <input
                    id="notes-search"
                    type="search"
                    placeholder="-i 'search notes, tags, content...'"
                    className="flex-1 bg-transparent text-[var(--note-accent)] focus:outline-none placeholder:text-[var(--note-faint)] text-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-full shrink-0 overflow-y-auto border-r border-[var(--note-border)] bg-[var(--note-panel)] custom-scrollbar lg:w-72">
                    <div className="p-3 space-y-1">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveGroup("all");
                            }}
                            className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${activeGroup === "all"
                                ? 'bg-[var(--note-accent-soft)] text-[var(--note-accent)] border-l-2 border-[var(--note-accent)]'
                                : 'text-[var(--note-muted)] hover:bg-[var(--note-hover)] hover:text-[var(--note-heading)] border-l-2 border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <FaBookOpen className={activeGroup === "all" ? "text-[var(--note-accent)]" : "text-[var(--note-muted)]"} /> ~/all_notes
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 ${activeGroup === "all" ? "text-[var(--note-accent)]" : "text-[var(--note-faint)]"}`}>[{notes.length}]</span>
                        </button>

                        <div className="pt-6 pb-2 px-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--note-faint)]">
                            <FaTags className="opacity-70" /> Tags
                        </div>

                        <div className="flex flex-wrap gap-2 px-3 pb-4">
                            {availableTags.map((tag) => (
                                <button
                                    type="button"
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`flex items-center gap-1 border px-2 py-1 text-[10px] transition-colors ${activeTag === tag
                                        ? 'bg-[var(--note-accent-soft)] text-[var(--note-accent)] border-[var(--note-accent)]'
                                        : 'bg-transparent text-[var(--note-muted)] border-[var(--note-border)] hover:border-[var(--note-muted)] hover:text-[var(--note-heading)]'
                                        }`}
                                >
                                    {tag === "all" ? "[all]" : `[${tag}]`}
                                </button>
                            ))}
                        </div>

                        <div className="pt-2 pb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--note-faint)]">Directories</div>

                        {Object.keys(sidebarTree).sort().map((group) => {
                            const isExpanded = expandedGroups.has(group) || activeGroup === group;
                            const totalItems = sidebarTree[group].notes.length + Object.values(sidebarTree[group].subgroups).flat().length;

                            return (
                                <div key={group} className="space-y-0.5">
                                    <div className={`group flex w-full shrink-0 items-center text-sm transition-colors ${activeGroup === group
                                        ? 'bg-[var(--note-accent-soft)] text-[var(--note-accent)] border-l-2 border-[var(--note-accent)]'
                                        : 'text-[var(--note-muted)] hover:bg-[var(--note-hover)] hover:text-[var(--note-heading)] border-l-2 border-transparent'
                                        }`}>
                                        <button
                                            type="button"
                                            onClick={(e) => toggleExpand(group, e)}
                                            className="px-2 py-2 text-[var(--note-muted)] hover:text-[var(--note-heading)] transition-colors"
                                            aria-label="Toggle Folder"
                                        >
                                            {isExpanded ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                setActiveGroup(group);
                                                if (!expandedGroups.has(group)) {
                                                    toggleExpand(group, e);
                                                }
                                            }}
                                            className="flex-1 flex items-center justify-between py-2 pr-3 truncate text-left"
                                        >
                                            <span className="flex items-center gap-2 truncate">
                                                <FaFolder className="text-[var(--note-folder)]" />
                                                {titleFromGroup(group)}/
                                            </span>
                                            <span className={`text-[10px] ${activeGroup === group ? "text-[var(--note-accent)]" : "text-[var(--note-faint)]"}`}>[{totalItems}]</span>
                                        </button>
                                    </div>

                                    {isExpanded && (
                                        <div className="ml-5 border-l border-[var(--note-border)] pl-2 space-y-0.5 my-1">
                                            {/* Subgroups */}
                                            {Object.keys(sidebarTree[group].subgroups).sort().map(sub => {
                                                const subKey = `${group}/${sub}`;
                                                const isSubExpanded = expandedGroups.has(subKey) || activeGroup === sub;

                                                return (
                                                    <div key={sub} className="space-y-0.5">
                                                        <div className={`flex w-full items-center text-sm transition-colors ${activeGroup === sub
                                                            ? 'bg-[var(--note-accent-soft)] text-[var(--note-accent)] border-l-2 border-[var(--note-accent)]'
                                                            : 'text-[var(--note-muted)] hover:bg-[var(--note-hover)] hover:text-[var(--note-heading)] border-l-2 border-transparent'
                                                            }`}>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => toggleExpand(subKey, e)}
                                                                className="px-2 py-1.5 text-[var(--note-muted)] hover:text-[var(--note-heading)] transition-colors"
                                                                aria-label="Toggle Folder"
                                                            >
                                                                {isSubExpanded ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    setActiveGroup(sub);
                                                                    if (!expandedGroups.has(subKey)) {
                                                                        toggleExpand(subKey, e);
                                                                    }
                                                                }}
                                                                className="flex-1 flex items-center gap-2 py-1.5 pr-3 truncate text-left"
                                                            >
                                                                <FaFolder className="text-[var(--note-folder)]" />
                                                                <span className="truncate">{titleFromGroup(sub)}/</span>
                                                            </button>
                                                        </div>

                                                        {isSubExpanded && (
                                                            <div className="ml-5 border-l border-[var(--note-border)] pl-2 space-y-0.5 my-1">
                                                                {[...sidebarTree[group].subgroups[sub]].sort((a, b) => a.title.localeCompare(b.title)).map(note => (
                                                                    <Link
                                                                        key={note.slug}
                                                                        href={`/notes/${note.slug}`}
                                                                        className="flex w-full items-center gap-2 border-l-2 border-transparent px-3 py-1.5 text-left text-xs text-[var(--note-muted)] no-underline transition-colors hover:bg-[var(--note-hover)] hover:text-[var(--note-heading)]"
                                                                    >
                                                                        <FaFileAlt className="shrink-0 text-[var(--note-faint)]" />
                                                                        <span className="truncate">{note.title}.md</span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                            {/* Direct Notes in Group */}
                                            {[...sidebarTree[group].notes].sort((a, b) => a.title.localeCompare(b.title)).map(note => (
                                                <Link
                                                    key={note.slug}
                                                    href={`/notes/${note.slug}`}
                                                    className="flex w-full items-center gap-2 border-l-2 border-transparent px-3 py-1.5 text-left text-xs text-[var(--note-muted)] no-underline transition-colors hover:bg-[var(--note-hover)] hover:text-[var(--note-heading)]"
                                                >
                                                    <FaFileAlt className="shrink-0 text-[var(--note-faint)]" />
                                                    <span className="truncate">{note.title}.md</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Content — Note Cards Grid */}
                <main className="flex-1 overflow-y-auto bg-[var(--note-bg)] custom-scrollbar hidden lg:block">
                    <div className="p-4 lg:p-8">
                        {Object.entries(displayGroups).map(([group, groupNotes]) => (
                            <div key={group} className="mb-12">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--note-accent)] mb-6 border-b border-[var(--note-border)] pb-2 flex items-center gap-2">
                                    <FaFolder className="text-[var(--note-folder)]" /> ~/{titleFromGroup(group)}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {groupNotes.map((note) => (
                                        <Link
                                            key={note.slug}
                                            href={`/notes/${note.slug}`}
                                            className="group relative flex h-[240px] flex-col overflow-hidden border border-[var(--note-border)] bg-[var(--note-card)] p-5 text-left no-underline shadow-sm transition-colors hover:border-[var(--note-accent)]"
                                        >
                                            <div className="relative flex flex-col h-full w-full">
                                                <div className="mb-2 flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-wider text-[var(--note-accent)] opacity-75">
                                                    <FaFileAlt /> {note.subgroup || note.group}/{note.slug}.md
                                                </div>
                                                <h4 className="mb-3 line-clamp-2 shrink-0 text-lg font-bold text-[var(--note-heading)] transition-colors group-hover:text-[var(--note-accent)]">{note.title}</h4>
                                                <p className="text-xs text-[var(--note-muted)] line-clamp-3 mb-4 flex-1">
                                                    <span className="text-[var(--note-accent)] mr-2">$</span>
                                                    cat {note.slug}.md | head -n 3<br />
                                                    <span className="text-[var(--note-text)] mt-1 block">{note.snippet}</span>
                                                </p>
                                                <div className="flex shrink-0 flex-wrap gap-2">
                                                    {note.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 bg-[var(--note-code-bg)] border border-[var(--note-border)] text-[10px] text-[var(--note-muted)] group-hover:text-[var(--note-accent)] transition-colors uppercase tracking-wider truncate max-w-full">[{tag}]</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {filteredNotes.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4 text-[var(--note-border)]">_</div>
                                <h3 className="text-sm font-bold text-[var(--note-accent)] font-mono">Process completed with exit code 1.</h3>
                                <p className="text-xs text-[var(--note-muted)] mt-2">No notes found matching your grep query.</p>
                                <button type="button" onClick={() => { setQuery(""); setActiveTag("all"); setActiveGroup("all"); }} className="mt-6 border border-[var(--note-border)] bg-[var(--note-card)] px-4 py-2 text-xs text-[var(--note-accent)] transition-colors hover:bg-[var(--note-hover)]">
                                    clear
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
