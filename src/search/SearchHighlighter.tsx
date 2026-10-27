// =====================================================
// SEARCH — <SearchHighlighter /> + hook
// =====================================================

import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
    PARAM_HIGHLIGHT,
    PARAM_SECTION,
    locateAndHighlight,
    type LocateResult,
} from './highlight';

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
export function SearchHighlighter({ rootId = 'fc-main-content' }: SearchHighlighterProps) {
    const { search, key } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const terms = params.get(PARAM_HIGHLIGHT) ?? '';
        const section = params.get(PARAM_SECTION);
        if (!terms && !section) return;

        let result: LocateResult | null = null;
        let cancelled = false;
        let observer: MutationObserver | null = null;
        let settleTimer: number | undefined;
        let giveUpTimer: number | undefined;
        let frame = 0;

        const root = () => document.getElementById(rootId) ?? document.body;

        const attempt = () => {
            if (cancelled || result?.found) return;
            const next = locateAndHighlight(root(), terms, section);
            if (next.found) {
                result = next;
                observer?.disconnect();
                window.clearTimeout(giveUpTimer);
            }
        };

        // Two frames: let React commit and the browser lay out before measuring.
        frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => {
                attempt();
                if (result?.found || cancelled) return;
                observer = new MutationObserver(() => {
                    window.clearTimeout(settleTimer);
                    settleTimer = window.setTimeout(attempt, 80);
                });
                observer.observe(root(), { childList: true, subtree: true, characterData: true });
                giveUpTimer = window.setTimeout(() => observer?.disconnect(), 3000);
            });
        });

        return () => {
            cancelled = true;
            cancelAnimationFrame(frame);
            observer?.disconnect();
            window.clearTimeout(settleTimer);
            window.clearTimeout(giveUpTimer);
            result?.clear();
        };
    }, [search, key, rootId]);

    return null;
}

/**
 * Read the search context from the URL. Pages with their own filters
 * (e.g. a directory) can use it to pre-fill the filter so the match is visible.
 */
export function useSearchHighlightParams(): { hl: string; sec: string } {
    const [params] = useSearchParams();
    return {
        hl: params.get(PARAM_HIGHLIGHT) ?? '',
        sec: params.get(PARAM_SECTION) ?? '',
    };
}
