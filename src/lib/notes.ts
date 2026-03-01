import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const NOTES_DIRECTORY = path.join(process.cwd(), 'notes');

export interface NoteMetadata {
    title: string;
    date?: string;
    tags: string[];
    slug: string;
    path: string;
    category: string;
    group: string;
    subgroup: string | null;
    snippet: string;
}

export interface Note extends NoteMetadata {
    content: string;
    html: string;
}

function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllMarkdownFiles(filePath, fileList);
        } else if (file.endsWith('.md')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

const extractTitle = (content: string, fallback: string) => {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : fallback;
};

const slugToTitle = (slug: string) =>
    slug
        .split("/")
        .pop()!
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const createExcerpt = (body: string) => {
    const cleaned = body.replace(/[#>*_`]/g, "").replace(/\s+/g, " ").trim();
    return cleaned.length > 180 ? `${cleaned.slice(0, 180)}…` : cleaned;
};

let notesCache: Note[] | null = null;

export async function getAllNotes(): Promise<Note[]> {
    if (notesCache && process.env.NODE_ENV === 'production') return notesCache;

    if (!fs.existsSync(NOTES_DIRECTORY)) return [];

    const files = getAllMarkdownFiles(NOTES_DIRECTORY);

    const notes = files.map((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const relativePath = path.relative(NOTES_DIRECTORY, filePath);
        const slug = relativePath.replace(/\.md$/, '');

        // slug could be something like "classes/info340/test"
        const pathParts = slug.split("/");

        let group = 'General';
        let subgroup = null;

        if (pathParts.length > 1) {
            group = pathParts[0];
            if (pathParts.length > 2) {
                // If it's deeper, join the middle folders as the subgroup
                subgroup = pathParts.slice(1, -1).join("/");
            }
        }

        const cleanedBody = content.replace(/^#\s+.+$/m, "").trim();

        return {
            title: data.title || extractTitle(content, slugToTitle(slug)),
            date: data.date ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date)) : '',
            tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
            slug,
            path: filePath,
            category: group,
            group: group,
            subgroup: subgroup,
            snippet: createExcerpt(cleanedBody),
            content,
            html: marked.parse(cleanedBody) as string,
        };
    });

    const sortedNotes = notes.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.title.localeCompare(b.title);
    });

    notesCache = sortedNotes;
    return sortedNotes;
}

export async function getAllTags(): Promise<string[]> {
    const notes = await getAllNotes();
    const tags = new Set<string>();
    notes.forEach(note => {
        note.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
}

/**
 * Legacy support for direct slug access, though less needed with pre-bundling.
 */
export async function getNoteBySlug(slug: string): Promise<Note | null> {
    const notes = await getAllNotes();
    return notes.find(n => n.slug === slug) || null;
}
