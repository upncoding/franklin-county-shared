// =====================================================
// SEARCH — result → URL
// =====================================================

import { PARAM_HIGHLIGHT, PARAM_SECTION } from './highlight';
import type { SearchResult } from './types';

/**
 * Build the in-app URL for a result. It carries the words to highlight (`hl`)
 * and the heading to start from (`sec`) so the destination page can scroll
 * straight to the match, and so the link is shareable / survives reload.
 */
export function buildSearchUrl(result: SearchResult): string {
    const { entry, matchTerms } = result;
    const hashIndex = entry.url.indexOf('#');
    const hash = hashIndex === -1 ? '' : entry.url.slice(hashIndex);
    const withoutHash = hashIndex === -1 ? entry.url : entry.url.slice(0, hashIndex);
    const queryIndex = withoutHash.indexOf('?');
    const path = queryIndex === -1 ? withoutHash : withoutHash.slice(0, queryIndex);
    const params = new URLSearchParams(queryIndex === -1 ? '' : withoutHash.slice(queryIndex + 1));

    // Page results open at the top; everything else jumps to the match.
    if (entry.kind !== 'page') {
        const terms = entry.highlight ?? matchTerms.slice(0, 4).join(' ');
        if (terms) params.set(PARAM_HIGHLIGHT, terms);
        if (entry.section) params.set(PARAM_SECTION, entry.section);
    }

    const qs = params.toString();
    return `${path}${qs ? `?${qs}` : ''}${hash}`;
}
