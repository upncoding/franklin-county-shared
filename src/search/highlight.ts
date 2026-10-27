// =====================================================
// SEARCH — navigate-to-keyword (DOM side)
//
// Finds the searched words on the current page, scrolls them into view
// below the fixed header, and highlights them WITHOUT touching the DOM
// tree (CSS Custom Highlight API), so React reconciliation is never
// disturbed. Browsers without the API still get scroll + a block flash.
// =====================================================

import { normalizeText } from './engine';

export const HIGHLIGHT_NAME = 'fc-search-hit';
export const HIGHLIGHT_ACTIVE_NAME = 'fc-search-hit-active';
export const FLASH_CLASS = 'fc-search-flash';

/** Query-string keys that carry search context between pages. */
export const PARAM_HIGHLIGHT = 'hl';
export const PARAM_SECTION = 'sec';

const MAX_RANGES = 120;

interface HighlightRegistryLike {
    set(name: string, value: unknown): void;
    delete(name: string): void;
}

function getRegistry(): HighlightRegistryLike | null {
    if (typeof CSS === 'undefined') return null;
    const reg = (CSS as unknown as { highlights?: HighlightRegistryLike }).highlights;
    return reg && typeof (globalThis as { Highlight?: unknown }).Highlight === 'function' ? reg : null;
}

function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Allow apostrophes between letters so "kendras" finds "Kendra’s". */
function termPattern(term: string): string {
    return [...term].map(escapeRegExp).join('[\'’]?');
}

export function splitTerms(raw: string): string[] {
    return [...new Set(
        raw
            .split(/\s+/)
            .map((t) => t.trim())
            .filter((t) => t.length >= 2 || /^\d$/.test(t)),
    )].slice(0, 6);
}

function visibleTextNodes(root: Element): Text[] {
    const nodes: Text[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || !node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        },
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const el = (n as Text).parentElement as (HTMLElement & { checkVisibility?: () => boolean }) | null;
        if (el && typeof el.checkVisibility === 'function' && !el.checkVisibility()) continue;
        nodes.push(n as Text);
    }
    return nodes;
}

function findHeading(root: Element, section: string): Element | null {
    const wanted = normalizeText(section);
    if (!wanted) return null;
    for (const h of root.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
        if (normalizeText(h.textContent ?? '') === wanted) return h;
    }
    return null;
}

function collectRanges(nodes: Text[], terms: string[], wholeWord: boolean): Range[] {
    if (terms.length === 0) return [];
    const body = terms.map(termPattern).join('|');
    const re = new RegExp(
        wholeWord ? `(?<![\\p{L}\\p{N}])(?:${body})(?![\\p{L}\\p{N}])` : `(?<![\\p{L}\\p{N}])(?:${body})`,
        'giu',
    );
    const ranges: Range[] = [];
    for (const node of nodes) {
        const text = node.nodeValue ?? '';
        re.lastIndex = 0;
        for (let m = re.exec(text); m; m = re.exec(text)) {
            if (m[0].length === 0) {
                re.lastIndex++;
                continue;
            }
            const r = new Range();
            r.setStart(node, m.index);
            r.setEnd(node, m.index + m[0].length);
            ranges.push(r);
            if (ranges.length >= MAX_RANGES) return ranges;
        }
    }
    return ranges;
}

function headerOffset(): number {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--fc-header-height');
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : 96;
}

function prefersReducedMotion(): boolean {
    return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollToRect(rect: DOMRect) {
    const top = rect.top + window.scrollY - headerOffset() - Math.round(window.innerHeight * 0.25);
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
}

const FLASH_SELECTOR = 'li, p, h1, h2, h3, h4, h5, h6, td, dd, blockquote, article';

export interface LocateResult {
    /** Whether we found anything to scroll to. */
    found: boolean;
    /** Call to remove highlights and flashes immediately. */
    clear: () => void;
}

/**
 * Locate, scroll to and highlight search terms inside `root`.
 *
 * @param root     Container to search (page content, not the site chrome).
 * @param terms    Raw `hl` text from the URL (space separated words).
 * @param section  Optional heading text; the first match *after* it wins.
 * @param holdMs   How long highlights stay visible. @default 9000
 */
export function locateAndHighlight(
    root: Element,
    terms: string,
    section: string | null,
    holdMs = 9000,
): LocateResult {
    const noop: LocateResult = { found: false, clear: () => {} };
    const words = splitTerms(terms);
    const heading = section ? findHeading(root, section) : null;
    if (words.length === 0 && !heading) return noop;

    const nodes = visibleTextNodes(root);
    let ranges = collectRanges(nodes, words, true);
    if (ranges.length === 0) ranges = collectRanges(nodes, words, false);

    let primary: Range | null = null;
    if (ranges.length > 0) {
        if (heading) {
            primary = ranges.find((r) => {
                const pos = heading.compareDocumentPosition(r.startContainer);
                return Boolean(pos & Node.DOCUMENT_POSITION_FOLLOWING) || heading.contains(r.startContainer);
            }) ?? null;
        }
        primary ??= ranges[0];
    }

    if (!primary && !heading) return noop;

    const targetRect = primary ? primary.getBoundingClientRect() : heading!.getBoundingClientRect();
    scrollToRect(targetRect);

    // Highlight the words (no DOM mutation).
    const registry = getRegistry();
    if (registry && ranges.length > 0) {
        const HighlightCtor = (globalThis as unknown as { Highlight: new (...r: Range[]) => { priority: number } }).Highlight;
        const all = new HighlightCtor(...ranges);
        all.priority = 0;
        registry.set(HIGHLIGHT_NAME, all);
        if (primary) {
            const active = new HighlightCtor(primary);
            active.priority = 1;
            registry.set(HIGHLIGHT_ACTIVE_NAME, active);
        }
    }

    // Flash the surrounding block so the spot is obvious everywhere.
    const anchorEl = (primary?.startContainer.parentElement ?? heading) as HTMLElement | null;
    const flashEl = anchorEl?.closest<HTMLElement>(FLASH_SELECTOR) ?? anchorEl;
    flashEl?.classList.add(FLASH_CLASS);

    // Move keyboard / screen-reader focus to the spot without re-scrolling.
    if (flashEl) {
        const hadTabindex = flashEl.hasAttribute('tabindex');
        if (!hadTabindex) flashEl.setAttribute('tabindex', '-1');
        flashEl.focus({ preventScroll: true });
        if (!hadTabindex) {
            flashEl.addEventListener('blur', () => flashEl.removeAttribute('tabindex'), { once: true });
        }
    }

    const clear = () => {
        registry?.delete(HIGHLIGHT_NAME);
        registry?.delete(HIGHLIGHT_ACTIVE_NAME);
        flashEl?.classList.remove(FLASH_CLASS);
    };
    const flashTimer = window.setTimeout(() => flashEl?.classList.remove(FLASH_CLASS), 2800);
    const holdTimer = window.setTimeout(clear, holdMs);

    return {
        found: true,
        clear: () => {
            window.clearTimeout(flashTimer);
            window.clearTimeout(holdTimer);
            clear();
        },
    };
}
