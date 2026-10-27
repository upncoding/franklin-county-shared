import type { SearchEngine, SearchEngineOptions, SearchEntry, SearchGroup, SearchKindMap, SearchResult } from './types';
/** Lowercase, strip accents and apostrophes, collapse punctuation to spaces. */
export declare function normalizeText(input: string): string;
/**
 * Build a ranking engine over a set of entries.
 *
 * Features: AND semantics across words, prefix matching (type-ahead), typo
 * tolerance, field weighting (title > keywords > page > body), phrase and
 * title-start bonuses, synonym expansion, and snippet generation.
 */
export declare function createSearchEngine(entries: SearchEntry[], options?: SearchEngineOptions): SearchEngine;
export declare const DEFAULT_SEARCH_KINDS: SearchKindMap;
/** Group ranked results by kind, ordered by the kind map. */
export declare function groupSearchResults(results: SearchResult[], kinds?: SearchKindMap): SearchGroup[];
