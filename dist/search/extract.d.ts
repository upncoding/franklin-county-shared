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
/**
 * Turn one rendered page into search entries: a `page` entry plus one
 * `section` entry per heading.
 */
export declare function extractSearchEntries(html: string, options: ExtractOptions): SearchEntry[];
/** Combine entries from many pages, dropping exact id duplicates. */
export declare function mergeSearchEntries(...lists: SearchEntry[][]): SearchEntry[];
