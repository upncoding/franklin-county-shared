import type { ReactNode } from 'react';
/**
 * A single searchable item. Apps either hand-write these (pinned contacts, etc.)
 * or generate them from rendered pages with `extractSearchEntries`.
 */
export interface SearchEntry {
    /** Stable unique id. */
    id: string;
    /** Primary label shown in results and weighted highest when matching. */
    title: string;
    /** Route to open when selected, e.g. `/aot`. May include a query string. */
    url: string;
    /**
     * Result category. Drives grouping/ordering in the dropdown.
     * Built-ins: `contact`, `page`, `resource`, `section`. Any string is allowed.
     */
    kind?: string;
    /** Display name of the page this entry lives on (shown as breadcrumb). */
    pageTitle?: string;
    /**
     * Heading text of the section this entry belongs to. Used after navigation
     * to scroll to the right place on the page.
     */
    section?: string;
    /** Heading level (2–6) of the section this entry came from. Set by the extractor. */
    level?: number;
    /** Body text. Searched with the lowest weight and used for snippets. */
    text?: string;
    /** Extra search-only terms (synonyms, alternate spellings). */
    keywords?: string[];
    /**
     * Optional link that overrides in-app navigation: `tel:`, `mailto:` or
     * an absolute URL. Handy for contact shortcuts.
     */
    href?: string;
    /** Ranking boost. 0 = neutral; use ~5 to pin something near the top. */
    priority?: number;
    /** Force the text that gets highlighted after navigation. */
    highlight?: string;
}
/** Shape of the generated `search-index.json` file. */
export interface SearchIndexFile {
    version: 1;
    generatedAt: string;
    entries: SearchEntry[];
}
export interface SearchSnippet {
    text: string;
    /** [start, end) character ranges inside `text` to emphasise. */
    ranges: Array<[number, number]>;
}
export interface SearchResult {
    entry: SearchEntry;
    score: number;
    /** Normalised document words that matched the query (used for highlighting). */
    matchTerms: string[];
    /** Short excerpt of the entry's text around the first match. */
    snippet?: SearchSnippet;
    /** Emphasis ranges for `entry.title`. */
    titleRanges: Array<[number, number]>;
}
export interface SearchGroup {
    kind: string;
    label: string;
    results: SearchResult[];
}
export interface SearchEngineOptions {
    /**
     * Query expansion. Keys are phrases a user might type; values are
     * alternative phrases that should also be searched.
     * @example { "kendra's law": ['assisted outpatient treatment', 'aot'] }
     */
    synonyms?: Record<string, string[]>;
    /** Snippet length in characters. @default 150 */
    snippetLength?: number;
}
export interface SearchOptions {
    /** Max results overall. @default 12 */
    limit?: number;
    /** Max results per kind. @default 5 */
    perGroupLimit?: number;
}
export interface SearchEngine {
    search(query: string, options?: SearchOptions): SearchResult[];
    readonly size: number;
}
/** Label + ordering for each result kind. Lower `order` renders first. */
export interface SearchKindConfig {
    label: string;
    order: number;
}
export type SearchKindMap = Record<string, SearchKindConfig>;
export interface SearchLabels {
    /** Input placeholder. @default "Search the site…" */
    placeholder?: string;
    /** Accessible name for the search field. @default "Search this site" */
    inputLabel?: string;
    /** Shown when a query has no results. */
    noResults?: string;
    /** Heading shown above `suggestions` when the box is focused and empty. */
    suggestionsHeading?: string;
    /** Footer hint describing keyboard use. Pass '' to hide. */
    keyboardHint?: string;
}
/**
 * Everything a site needs to turn search on. Pass as `search` to `<Layout>`,
 * or spread onto `<SearchBox>` directly.
 */
export interface SearchConfig {
    /** URL of a generated `search-index.json`. Fetched lazily on first use. */
    indexUrl?: string;
    /** Entries bundled in code. Merged with `indexUrl` entries when both given. */
    entries?: SearchEntry[];
    /** See {@link SearchEngineOptions.synonyms}. */
    synonyms?: Record<string, string[]>;
    /** Override or extend the default result groups. */
    kinds?: SearchKindMap;
    /** UI copy overrides. */
    labels?: SearchLabels;
    /** Quick-start queries shown when the box is focused and empty. */
    suggestions?: string[];
    /**
     * Rendered under "no results". Use it to point at a phone number or
     * resource directory.
     */
    emptyState?: ReactNode;
    /** Max results overall. @default 12 */
    limit?: number;
    /** Max results per group. @default 5 */
    perGroupLimit?: number;
}
