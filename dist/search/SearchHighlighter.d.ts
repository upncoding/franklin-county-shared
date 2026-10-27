export interface SearchHighlighterProps {
    /** `id` of the page-content container. @default "fc-main-content" */
    rootId?: string;
}
/**
 * Watches the URL for `?hl=…&sec=…` (written by SearchBox) and, once the page
 * has rendered, scrolls to and highlights the match.
 *
 * `<Layout>` mounts this for you. Render it yourself only if you don't use Layout.
 * Safe when React re-renders slowly: it retries via MutationObserver for ~3s.
 */
export declare function SearchHighlighter({ rootId }: SearchHighlighterProps): null;
/**
 * Read the search context from the URL. Pages with their own filters
 * (e.g. a directory) can use it to pre-fill the filter so the match is visible.
 */
export declare function useSearchHighlightParams(): {
    hl: string;
    sec: string;
};
