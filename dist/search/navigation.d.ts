import type { SearchResult } from './types';
/**
 * Build the in-app URL for a result. It carries the words to highlight (`hl`)
 * and the heading to start from (`sec`) so the destination page can scroll
 * straight to the match, and so the link is shareable / survives reload.
 */
export declare function buildSearchUrl(result: SearchResult): string;
