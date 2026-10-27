// =====================================================
// SEARCH — public API
// =====================================================

export { SearchBox } from './SearchBox';
export type { SearchBoxProps } from './SearchBox';

export { SearchHighlighter, useSearchHighlightParams } from './SearchHighlighter';
export type { SearchHighlighterProps } from './SearchHighlighter';

export { useSearchEngine } from './useSearchEngine';
export type { UseSearchEngineResult } from './useSearchEngine';

export {
    createSearchEngine,
    groupSearchResults,
    normalizeText,
    DEFAULT_SEARCH_KINDS,
} from './engine';

export { extractSearchEntries, mergeSearchEntries } from './extract';
export type { ExtractOptions } from './extract';

export { buildSearchUrl } from './navigation';
export { PARAM_HIGHLIGHT, PARAM_SECTION } from './highlight';

export type {
    SearchConfig,
    SearchEngine,
    SearchEngineOptions,
    SearchEntry,
    SearchGroup,
    SearchIndexFile,
    SearchKindConfig,
    SearchKindMap,
    SearchLabels,
    SearchOptions,
    SearchResult,
    SearchSnippet,
} from './types';
