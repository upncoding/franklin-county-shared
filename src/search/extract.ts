// =====================================================
// SEARCH — HTML → SearchEntry extraction
//
// Pure string processing (no DOM, no dependencies) so it can run in Node
// against React `renderToString` output at build time. Not used by the
// browser UI, so bundlers drop it from client builds.
// =====================================================

import type { SearchEntry } from './types';

export interface ExtractOptions {
    /** Route the HTML was rendered for, e.g. `/aot`. */
    url: string;
    /**
     * `id` of the element wrapping the page's own content. Everything outside
     * (navbar, footer, mobile menu) is ignored so it isn't indexed on every page.
     * @default "fc-main-content"
     */
    rootId?: string;
    /** Deepest heading level that starts a new section (1–6). @default 4 */
    maxHeadingLevel?: number;
    /** Max characters of body text kept per section. @default 4000 */
    maxSectionText?: number;
    /** Max characters of body text kept on the page entry. @default 1500 */
    maxPageText?: number;
    /** Page title to use if the page has no `<h1>`. */
    fallbackTitle?: string;
}

const VOID_TAGS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr',
]);
const SKIP_TAGS = new Set(['script', 'style', 'svg', 'noscript', 'template', 'video', 'audio', 'canvas', 'iframe']);
const BLOCK_TAGS = new Set([
    'p', 'div', 'li', 'ul', 'ol', 'section', 'article', 'aside', 'header', 'footer', 'main', 'nav', 'form',
    'table', 'thead', 'tbody', 'tr', 'td', 'th', 'dl', 'dt', 'dd', 'br', 'hr', 'blockquote', 'figure',
    'figcaption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'button', 'details', 'summary',
]);

const TOKEN_RE = /<!--[\s\S]*?-->|<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>|([^<]+)/g;

const NAMED_ENTITIES: Record<string, string> = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—',
    rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', copy: '©',
};

function decodeEntities(s: string): string {
    return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, body: string) => {
        if (body[0] === '#') {
            const code = body[1].toLowerCase() === 'x' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
            return Number.isFinite(code) ? String.fromCodePoint(code) : m;
        }
        return NAMED_ENTITIES[body.toLowerCase()] ?? m;
    });
}

function clean(s: string): string {
    return decodeEntities(s).replace(/\s+/g, ' ').trim();
}

function slugify(s: string): string {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section';
}

/** Return the HTML between `<main id="rootId">` and its closing tag, or the whole input. */
function sliceRoot(html: string, rootId: string): string {
    const open = new RegExp(`<([a-zA-Z][a-zA-Z0-9-]*)\\b[^>]*\\bid=["']${rootId}["'][^>]*>`).exec(html);
    if (!open) return html;
    const tag = open[1];
    const start = open.index + open[0].length;
    // Walk forward counting nested tags of the same name.
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    re.lastIndex = start;
    let depth = 1;
    for (let m = re.exec(html); m; m = re.exec(html)) {
        depth += m[1] ? -1 : 1;
        if (depth === 0) return html.slice(start, m.index);
    }
    return html.slice(start);
}

interface Section {
    heading: string;
    level: number;
    body: string[];
}

/**
 * Turn one rendered page into search entries: a `page` entry plus one
 * `section` entry per heading.
 */
export function extractSearchEntries(html: string, options: ExtractOptions): SearchEntry[] {
    const rootId = options.rootId ?? 'fc-main-content';
    const maxLevel = options.maxHeadingLevel ?? 4;
    const maxSection = options.maxSectionText ?? 4000;
    const maxPage = options.maxPageText ?? 1500;

    const root = sliceRoot(html, rootId);

    const stack: string[] = [];
    let skipFrom = -1;

    let pageTitle = '';
    const intro: string[] = [];
    const sections: Section[] = [];
    let current: Section | null = null;
    let headingBuf: string[] | null = null;
    let headingLevel = 0;

    const pushText = (text: string) => {
        if (headingBuf) headingBuf.push(text);
        else if (current) current.body.push(text);
        else intro.push(text);
    };

    TOKEN_RE.lastIndex = 0;
    for (let m = TOKEN_RE.exec(root); m; m = TOKEN_RE.exec(root)) {
        const whole = m[0];
        if (whole.startsWith('<!--')) continue;

        // ── Text node ──
        if (m[3] !== undefined) {
            if (skipFrom === -1) pushText(m[3]);
            continue;
        }

        const name = m[1].toLowerCase();
        const isClose = whole.startsWith('</');
        const attrs = m[2] ?? '';

        if (isClose) {
            // Pop to the matching open tag (tolerates sloppy markup).
            const idx = stack.lastIndexOf(name);
            if (idx !== -1) {
                stack.length = idx;
                if (skipFrom !== -1 && idx <= skipFrom) skipFrom = -1;
            }
            if (skipFrom === -1) {
                if (/^h[1-6]$/.test(name) && headingBuf) {
                    const text = clean(headingBuf.join(' '));
                    headingBuf = null;
                    if (headingLevel === 1) {
                        if (!pageTitle) pageTitle = text;
                    } else if (text) {
                        current = { heading: text, level: headingLevel, body: [] };
                        sections.push(current);
                    }
                } else if (BLOCK_TAGS.has(name)) {
                    pushText(' ');
                }
            }
            continue;
        }

        // ── Opening tag ──
        const selfClosing = whole.endsWith('/>') || VOID_TAGS.has(name);
        const hidden = /\saria-hidden=["']true["']|\shidden(?:\s|=|$)/.test(` ${attrs}`);

        if (!selfClosing) {
            stack.push(name);
            if (skipFrom === -1 && (SKIP_TAGS.has(name) || hidden)) skipFrom = stack.length - 1;
        }
        if (skipFrom !== -1) continue;

        if (/^h[1-6]$/.test(name)) {
            const level = Number(name[1]);
            if (level <= maxLevel) {
                headingBuf = [];
                headingLevel = level;
            }
        } else if (BLOCK_TAGS.has(name)) {
            pushText(' ');
        } else if (name === 'img') {
            // Alt text is searchable content.
            const alt = /\salt=["']([^"']*)["']/.exec(` ${attrs}`);
            if (alt && alt[1]) pushText(` ${alt[1]} `);
        }
    }

    const url = options.url;
    const title = pageTitle || options.fallbackTitle || url;
    const entries: SearchEntry[] = [];
    const usedIds = new Set<string>();
    const uniqueId = (base: string) => {
        let id = base;
        for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
        usedIds.add(id);
        return id;
    };

    const introText = clean(intro.join(' '));
    const allBodies = sections.map((s) => `${s.heading}. ${clean(s.body.join(' '))}`);
    const pageText = clean([introText, ...allBodies].join(' ')).slice(0, maxPage);

    entries.push({
        id: uniqueId(`page:${url}`),
        kind: 'page',
        title,
        url,
        pageTitle: title,
        text: pageText,
    });

    for (const s of sections) {
        const body = clean(s.body.join(' ')).slice(0, maxSection);
        entries.push({
            id: uniqueId(`section:${url}#${slugify(s.heading)}`),
            kind: 'section',
            title: s.heading,
            url,
            pageTitle: title,
            section: s.heading,
            level: s.level,
            text: body,
        });
    }

    return entries;
}

/** Combine entries from many pages, dropping exact id duplicates. */
export function mergeSearchEntries(...lists: SearchEntry[][]): SearchEntry[] {
    const seen = new Set<string>();
    const out: SearchEntry[] = [];
    for (const list of lists) {
        for (const e of list) {
            if (seen.has(e.id)) continue;
            seen.add(e.id);
            out.push(e);
        }
    }
    return out;
}
