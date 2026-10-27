export declare const HIGHLIGHT_NAME = "fc-search-hit";
export declare const HIGHLIGHT_ACTIVE_NAME = "fc-search-hit-active";
export declare const FLASH_CLASS = "fc-search-flash";
/** Query-string keys that carry search context between pages. */
export declare const PARAM_HIGHLIGHT = "hl";
export declare const PARAM_SECTION = "sec";
export declare function splitTerms(raw: string): string[];
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
export declare function locateAndHighlight(root: Element, terms: string, section: string | null, holdMs?: number): LocateResult;
