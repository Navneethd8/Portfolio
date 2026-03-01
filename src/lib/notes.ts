import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NOTES_DIRECTORY = path.join(process.cwd(), 'notes');

export interface NoteMetadata {
    title: string;
    date?: string;
    tags: string[];
    slug: string; // The path relative to the notes directory (e.g., 'classes/info340/lec1')
    path: string; // The full absolute path
    category: string; // The parent folder name
}

export interface Note extends NoteMetadata {
    content: string;
}

/**
 * Recursively gets all markdown files in the notes directory.
 */
function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
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

let notesCache: NoteMetadata[] | null = null;
let tagsCache: string[] | null = null;

/**
 * Gets all notes with their metadata.
 */
export async function getAllNotes(): Promise<NoteMetadata[]> {
    if (notesCache && process.env.NODE_ENV === 'production') return notesCache;

    if (!fs.existsSync(NOTES_DIRECTORY)) return [];

    const files = getAllMarkdownFiles(NOTES_DIRECTORY);

    const notes = files.map((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        // Calculate relative slug
        const relativePath = path.relative(NOTES_DIRECTORY, filePath);
        const slug = relativePath.replace(/\.md$/, '');
        const category = path.dirname(relativePath);

        return {
            title: data.title || path.basename(slug),
            date: data.date || '',
            tags: data.tags || [],
            slug,
            path: filePath,
            category: category === '.' ? 'General' : category,
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

/**
 * Gets a single note by its slug.
 */
export async function getNoteBySlug(slug: string): Promise<Note | null> {
    const filePath = path.join(NOTES_DIRECTORY, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const relativePath = path.relative(NOTES_DIRECTORY, filePath);
    const category = path.dirname(relativePath);

    return {
        title: data.title || path.basename(slug),
        date: data.date || '',
        tags: data.tags || [],
        slug,
        path: filePath,
        category: category === '.' ? 'General' : category,
        content,
    };
}

/**
 * Gets all unique tags across all notes.
 */
export async function getAllTags(): Promise<string[]> {
    const notes = await getAllNotes();
    const tags = new Set<string>();
    notes.forEach(note => {
        note.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
}
