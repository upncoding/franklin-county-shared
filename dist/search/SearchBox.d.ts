import type { SearchConfig, SearchResult } from './types';
export interface SearchBoxProps extends SearchConfig {
    /**
     * `header` — translucent field for the dark site header.
     * `light`  — bordered field for light surfaces (mobile menu, page body).
     * @default "header"
     */
    variant?: 'header' | 'light';
    /**
     * `floating` — results panel overlays content below the field.
     * `inline`   — panel flows in the document (use inside scroll containers).
     * @default "floating"
     */
    dropdown?: 'floating' | 'inline';
    /** Which edge the floating panel aligns to. @default "right" */
    align?: 'left' | 'right';
    /** Extra classes for the root wrapper (sizing/margins). */
    className?: string;
    /** Focus the field with `/` or Ctrl/⌘+K. Enable on one instance per page. */
    shortcut?: boolean;
    /**
     * Dynamically expand the input width when focused or active.
     * Defaults to true when variant="header" and dropdown="floating".
     */
    expandable?: boolean;
    /** Called after a result is chosen (e.g. close a mobile menu). */
    onNavigate?: () => void;
    /** Replace the default "go to the result" behaviour. */
    onSelect?: (result: SearchResult) => void;
    /** Called on Enter when the query has no results. */
    onSearch?: (query: string) => void;
    autoFocus?: boolean;
}
export declare function SearchBox({ variant, dropdown, align, className, shortcut, expandable, onNavigate, onSelect, onSearch, autoFocus, indexUrl, entries, synonyms, kinds, labels, suggestions, emptyState, limit, perGroupLimit, }: SearchBoxProps): import("react").JSX.Element;
