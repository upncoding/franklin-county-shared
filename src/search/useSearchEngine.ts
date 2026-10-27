// =====================================================
// SEARCH — lazy index loading + engine cache
// =====================================================

import { useEffect, useMemo, useState } from 'react';
import { createSearchEngine } from './engine';
import type { SearchConfig, SearchEngine, SearchEntry, SearchIndexFile } from './types';

type Status = 'idle' | 'loading' | 'ready' | 'error';

// Module-level caches: Layout remounts on every route, so without these the
// index would be re-fetched and re-built on each page change.
const indexCache = new Map<string, Promise<SearchEntry[]>>();
const engineCache = new Map<string, SearchEngine>();

function loadIndex(url: string): Promise<SearchEntry[]> {
    let p = indexCache.get(url);
    if (!p) {
        p = fetch(url, { headers: { Accept: 'application/json' } })
            .then((res) => {
                if (!res.ok) throw new Error(`Search index request failed: ${res.status}`);
                return res.json() as Promise<SearchIndexFile>;
            })
            .then((file) => file.entries);
        // Don't cache failures — allow a retry on the next focus.
        p.catch(() => indexCache.delete(url));
        indexCache.set(url, p);
    }
    return p;
}

export interface UseSearchEngineResult {
    engine: SearchEngine | null;
    status: Status;
}

/**
 * Builds a search engine from `entries` and/or a remote `indexUrl`.
 * Nothing is fetched until `enabled` becomes true (first focus/hover).
 */
export function useSearchEngine(
    config: Pick<SearchConfig, 'indexUrl' | 'entries' | 'synonyms'>,
    enabled: boolean,
): UseSearchEngineResult {
    const { indexUrl, entries, synonyms } = config;
    const [remote, setRemote] = useState<{ url: string; entries: SearchEntry[] } | null>(null);
    const [failedUrl, setFailedUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled || !indexUrl) return;
        let cancelled = false;
        loadIndex(indexUrl)
            .then((loaded) => {
                if (!cancelled) setRemote({ url: indexUrl, entries: loaded });
            })
            .catch(() => {
                if (!cancelled) setFailedUrl(indexUrl);
            });
        return () => {
            cancelled = true;
        };
    }, [enabled, indexUrl]);

    const synonymKey = useMemo(() => JSON.stringify(synonyms ?? {}), [synonyms]);
    const remoteEntries = remote && remote.url === indexUrl ? remote.entries : null;
    const remoteFailed = !!indexUrl && failedUrl === indexUrl;
    const hasInline = !!entries?.length;

    const engine = useMemo(() => {
        if (!enabled) return null;
        if (indexUrl && !remoteEntries && !(remoteFailed && hasInline)) return null;

        // Inline entries can change identity; only cache pure-remote engines.
        const cacheKey = indexUrl && !hasInline ? `${indexUrl}::${synonymKey}` : null;
        if (cacheKey) {
            const hit = engineCache.get(cacheKey);
            if (hit) return hit;
        }
        const merged = [...(entries ?? []), ...(remoteEntries ?? [])];
        const built = createSearchEngine(merged, { synonyms });
        if (cacheKey) engineCache.set(cacheKey, built);
        return built;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, indexUrl, remoteEntries, remoteFailed, hasInline, entries, synonymKey]);

    let status: Status = 'idle';
    if (enabled) {
        if (engine) status = 'ready';
        else if (remoteFailed) status = 'error';
        else status = 'loading';
    }
    return { engine, status };
}
