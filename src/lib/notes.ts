import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

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
            // Skip .obsidian and nested 'notes' directory (submodule artifact)
            if (file === '.obsidian' || (dir === NOTES_DIRECTORY && file === 'notes')) return;
            getAllMarkdownFiles(filePath, fileList);
        } else if (file.endsWith('.md') && file !== 'template.md') {
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
    // Strip LaTeX, markdown formatting, and Obsidian syntax for clean excerpts
    const cleaned = body
        .replace(/\$\$[\s\S]*?\$\$/g, '[equation]')   // block math
        .replace(/\$[^$\n]+?\$/g, '[math]')            // inline math
        .replace(/!\[\[.*?\]\]/g, '')                   // obsidian embeds
        .replace(/>\s*\[!.*?\].*$/gm, '')               // callout headers
        .replace(/==([^=]+)==/g, '$1')                  // highlights
        .replace(/\[\^.*?\]/g, '')                      // footnote refs
        .replace(/\[\^.*?\]:.*$/gm, '')                 // footnote defs
        .replace(/[#>*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    return cleaned.length > 180 ? `${cleaned.slice(0, 180)}…` : cleaned;
};

/**
 * Pre-process Obsidian-specific markdown syntax before passing to unified pipeline.
 * Handles: callouts, image embeds, highlights, footnotes, wikilinks
 */
function preprocessObsidian(content: string): string {
    let processed = content;

    // 1. Obsidian callouts: >[!type] Title  →  styled HTML blockquotes
    // Must be done before remark parses blockquotes
    processed = processed.replace(
        /^>\s*\[!(note|tip|important|warning|caution|question|info|example|abstract|summary|todo|success|failure|danger|bug|quote)\]\s*(.*)$/gim,
        (_, type, title) => {
            const calloutTitle = title.trim() || type.charAt(0).toUpperCase() + type.slice(1);
            return `> <div class="obsidian-callout callout-${type.toLowerCase()}" data-callout="${type.toLowerCase()}"><div class="callout-title"><span class="callout-icon"></span><span>${calloutTitle}</span></div><div class="callout-content">`;
        }
    );

    // Close callout blocks: find where the blockquote content ends
    // This regex finds callout openings and wraps subsequent > lines
    const lines = processed.split('\n');
    const result: string[] = [];
    let inCallout = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.includes('obsidian-callout')) {
            inCallout = true;
            // Strip the leading > from the callout opening
            result.push(line.replace(/^>\s*/, ''));
            continue;
        }

        if (inCallout) {
            if (line.startsWith('>')) {
                // Content inside the callout — strip the > prefix
                result.push(line.replace(/^>\s?/, ''));
            } else {
                // End of callout
                result.push('</div></div>');
                result.push('');
                inCallout = false;
                result.push(line);
            }
        } else {
            result.push(line);
        }
    }

    // If we ended inside a callout, close it
    if (inCallout) {
        result.push('</div></div>');
    }

    processed = result.join('\n');

    // 2. Obsidian image embeds: ![[image.png]] or ![[image.png|width]]
    processed = processed.replace(
        /!\[\[([^\]|]+?)(?:\|(\d+))?\]\]/g,
        (_, filename, width) => {
            const encodedFilename = encodeURIComponent(filename);
            const widthAttr = width ? ` width="${width}"` : '';
            return `<img src="/api/note-image/${encodedFilename}" alt="${filename}"${widthAttr} class="obsidian-embed" />`;
        }
    );

    // 3. Obsidian highlights: ==text== → <mark>text</mark>
    processed = processed.replace(/==([^=]+?)==/g, '<mark>$1</mark>');

    // 4. Obsidian wikilinks: [[page]] or [[page|display]]
    processed = processed.replace(
        /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g,
        (_, target, display) => {
            const text = display || target;
            return `<span class="wikilink" title="${target}">${text}</span>`;
        }
    );

    return processed;
}

/**
 * Render markdown to HTML using unified pipeline with KaTeX, GFM, and syntax highlighting
 */
async function renderMarkdown(content: string): Promise<string> {
    // Pre-process Obsidian syntax
    const preprocessed = preprocessObsidian(content);

    const result = await unified()
        .use(remarkParse)
        .use(remarkMath)         // Parse $...$ and $$...$$ 
        .use(remarkGfm)          // Tables, strikethrough, task lists, etc.
        .use(remarkRehype, {
            allowDangerousHtml: true  // Allow our callout HTML to pass through
        })
        .use(rehypeKatex, {
            throwOnError: false,
            strict: false,
            trust: true,
        } as Parameters<typeof rehypeKatex>[0])
        .use(rehypeHighlight, {
            detect: true,            // Auto-detect language when not specified
            ignoreMissing: true      // Don't throw on unknown languages
        })
        .use(rehypeStringify, {
            allowDangerousHtml: true  // Preserve our callout HTML
        })
        .process(preprocessed);

    return String(result);
}

/**
 * Parse a single markdown file into its metadata (no HTML rendering).
 */
function parseNoteMetadata(filePath: string): NoteMetadata {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const relativePath = path.relative(NOTES_DIRECTORY, filePath);
    const slug = relativePath.replace(/\.md$/, '');

    const pathParts = slug.split("/");

    let group = 'General';
    let subgroup = null;

    if (pathParts.length > 1) {
        group = pathParts[0];
        if (pathParts.length > 2) {
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
    };
}

let metaCache: NoteMetadata[] | null = null;

/**
 * Get metadata for all notes — NO HTML rendering.
 * Used by the list page for fast loading.
 */
export function getAllNotesMeta(): NoteMetadata[] {
    if (metaCache && process.env.NODE_ENV === 'production') return metaCache;

    if (!fs.existsSync(NOTES_DIRECTORY)) return [];

    const files = getAllMarkdownFiles(NOTES_DIRECTORY);

    const notes = files.map((filePath) => parseNoteMetadata(filePath));

    const sortedNotes = notes.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.title.localeCompare(b.title);
    });

    metaCache = sortedNotes;
    return sortedNotes;
}

export function getAllTags(): string[] {
    const notes = getAllNotesMeta();
    const tags = new Set<string>();
    notes.forEach(note => {
        note.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
}

/**
 * Get a single note by slug — including full HTML rendering.
 * Only called when a user navigates to a specific note page.
 */
export async function getNoteBySlug(slug: string): Promise<Note | null> {
    const filePath = path.join(NOTES_DIRECTORY, `${slug}.md`);

    if (!fs.existsSync(filePath)) return null;

    const metadata = parseNoteMetadata(filePath);

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);
    const cleanedBody = content.replace(/^#\s+.+$/m, "").trim();
    const html = await renderMarkdown(cleanedBody);

    return {
        ...metadata,
        content,
        html,
    };
}
