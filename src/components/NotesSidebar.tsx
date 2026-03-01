"use client";

import React, { useState } from 'react';
import { NoteMetadata } from '@/lib/notes';
import { FaSearch, FaFolder, FaFileAlt, FaTag, FaChevronRight, FaChevronDown } from 'react-icons/fa';

interface NotesSidebarProps {
    notes: NoteMetadata[];
    activeSlug: string | null;
    onSelectNote: (slug: string) => void;
    allTags: string[];
}

interface TreeFolder {
    name: string;
    path: string;
    children: (TreeFolder | NoteMetadata)[];
    isOpen: boolean;
}

const NotesSidebar: React.FC<NotesSidebarProps> = ({ notes, activeSlug, onSelectNote, allTags }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['General']));

    const toggleFolder = (folderPath: string) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(folderPath)) next.delete(folderPath);
            else next.add(folderPath);
            return next;
        });
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesTag = !selectedTag || note.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    // Build the hierarchical tree
    const buildTree = (): (TreeFolder | NoteMetadata)[] => {
        const root: (TreeFolder | NoteMetadata)[] = [];
        const folderMap: Record<string, TreeFolder> = {};

        filteredNotes.forEach(note => {
            const parts = note.slug.split('/');
            const fileName = parts.pop(); // Remove the file name, we only care about folders for path
            let currentPath = '';
            let currentLevel = root;

            parts.forEach((part, index) => {
                currentPath = currentPath ? `${currentPath}/${part}` : part;
                if (!folderMap[currentPath]) {
                    const newFolder: TreeFolder = {
                        name: part,
                        path: currentPath,
                        children: [],
                        isOpen: expandedFolders.has(currentPath)
                    };
                    folderMap[currentPath] = newFolder;
                    currentLevel.push(newFolder);
                }
                currentLevel = folderMap[currentPath].children;
            });

            currentLevel.push(note);
        });

        return root;
    };

    const renderTree = (items: (TreeFolder | NoteMetadata)[], level: number = 0) => {
        return items.map((item) => {
            if ('children' in item) {
                // It's a folder
                const isOpen = expandedFolders.has(item.path);
                return (
                    <div key={item.path} className="mb-0.5">
                        <button
                            onClick={() => toggleFolder(item.path)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                            style={{ paddingLeft: `${(level * 12) + 8}px` }}
                        >
                            {isOpen ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                            <FaFolder className="text-blue-400 text-sm" />
                            <span className="truncate">{item.name}</span>
                        </button>
                        {isOpen && (
                            <div className="mt-0.5">
                                {renderTree(item.children, level + 1)}
                            </div>
                        )}
                    </div>
                );
            } else {
                // It's a note
                return (
                    <button
                        key={item.slug}
                        onClick={() => onSelectNote(item.slug)}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-all flex items-center gap-2 ${activeSlug === item.slug
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-2 border-blue-600'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        style={{ paddingLeft: `${(level * 12) + 12}px` }}
                    >
                        <FaFileAlt className={`text-[10px] flex-shrink-0 ${activeSlug === item.slug ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className="truncate">{item.title}</span>
                    </button>
                );
            }
        });
    };

    const tree = buildTree();

    return (
        <div className="flex flex-col h-full border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            {/* Search Bar */}
            <div className="p-4">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search notes or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                    />
                </div>
            </div>

            {/* Tags Ribbon */}
            <div className="px-4 pb-4 flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-2 py-1 text-[10px] font-medium rounded-full border transition-all ${!selectedTag ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500'
                        }`}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={`px-2 py-1 text-[10px] font-medium rounded-full border transition-all flex items-center gap-1 ${selectedTag === tag ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500'
                            }`}
                    >
                        <FaTag className="text-[8px]" />
                        {tag}
                    </button>
                ))}
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
                {renderTree(tree)}
            </div>
        </div>
    );
};

export default NotesSidebar;
