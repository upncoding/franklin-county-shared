import type { SearchConfig, SearchEngine } from './types';
type Status = 'idle' | 'loading' | 'ready' | 'error';
export interface UseSearchEngineResult {
    engine: SearchEngine | null;
    status: Status;
}
/**
 * Builds a search engine from `entries` and/or a remote `indexUrl`.
 * Nothing is fetched until `enabled` becomes true (first focus/hover).
 */
export declare function useSearchEngine(config: Pick<SearchConfig, 'indexUrl' | 'entries' | 'synonyms'>, enabled: boolean): UseSearchEngineResult;
export {};
