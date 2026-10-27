// =====================================================
// SEARCH — dependency-free ranking engine
//
// Pure TypeScript, no DOM, no React. Safe to run in the browser
// (SearchBox) and in Node (index generation / tests).
// =====================================================

import type {
    SearchEngine,
    SearchEngineOptions,
    SearchEntry,
    SearchGroup,
    SearchKindMap,
    SearchOptions,
    SearchResult,
    SearchSnippet,
} from './types';

// ─── Text normalisation ──────────────────────────────

/** Matches a word, keeping inner apostrophes ("Kendra's") together. */
const WORD_RE = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
/** North-American phone numbers, so "5188912280" finds "518-891-2280". */
const PHONE_RE = /\b\d{3}[-.\s)]*\d{3}[-.\s]*\d{4}\b/g;

const STOP_WORDS = new Set([
    'a', 'an', 'the', 'of', 'and', 'or', 'for', 'to', 'in', 'on', 'at', 'is', 'are', 'do', 'i', 'my', 'me', 'how',
]);

/** Lowercase, strip accents and apostrophes, collapse punctuation to spaces. */
export function normalizeText(input: string): string {
    return input
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['’`]/g, '')
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .trim();
}

function tokenize(input: string): string[] {
    const normalized = normalizeText(input);
    return normalized ? normalized.split(' ') : [];
}

function phoneTokens(input: string): string[] {
    const out: string[] = [];
    for (const m of input.matchAll(PHONE_RE)) out.push(m[0].replace(/\D/g, ''));
    return out;
}

// ─── Edit distance (bounded Damerau-Levenshtein / OSA) ─

/** Returns `max + 1` as soon as the distance is known to exceed `max`. */
function editDistance(a: string, b: string, max: number): number {
    if (a === b) return 0;
    const la = a.length;
    const lb = b.length;
    if (Math.abs(la - lb) > max) return max + 1;

    let prev2: number[] = new Array(lb + 1).fill(0);
    let prev: number[] = Array.from({ length: lb + 1 }, (_, j) => j);
    let cur: number[] = new Array(lb + 1).fill(0);

    for (let i = 1; i <= la; i++) {
        cur[0] = i;
        let rowMin = cur[0];
        for (let j = 1; j <= lb; j++) {
            const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
            let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                v = Math.min(v, prev2[j - 2] + 1);
            }
            cur[j] = v;
            if (v < rowMin) rowMin = v;
        }
        if (rowMin > max) return max + 1;
        [prev2, prev, cur] = [prev, cur, prev2];
    }
    return prev[lb];
}

// ─── Index structures ────────────────────────────────

const FIELD_TITLE = 0;
const FIELD_KEYWORDS = 1;
const FIELD_PAGE = 2;
const FIELD_TEXT = 3;
const FIELD_WEIGHTS = [6, 4, 1.5, 1];

interface Posting {
    entry: number;
    field: number;
    count: number;
}

interface TokenMatch {
    key: string;
    quality: number;
}

interface PreparedEntry {
    entry: SearchEntry;
    normTitle: string;
    normText: string;
}

function addPostings(
    vocab: Map<string, Posting[]>,
    entryIndex: number,
    field: number,
    tokens: string[],
) {
    const counts = new Map<string, number>();
    for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1);
    for (const [token, count] of counts) {
        let list = vocab.get(token);
        if (!list) {
            list = [];
            vocab.set(token, list);
        }
        list.push({ entry: entryIndex, field, count });
    }
}

// ─── Engine ──────────────────────────────────────────

/**
 * Build a ranking engine over a set of entries.
 *
 * Features: AND semantics across words, prefix matching (type-ahead), typo
 * tolerance, field weighting (title > keywords > page > body), phrase and
 * title-start bonuses, synonym expansion, and snippet generation.
 */
export function createSearchEngine(
    entries: SearchEntry[],
    options: SearchEngineOptions = {},
): SearchEngine {
    const snippetLength = options.snippetLength ?? 150;
    const prepared: PreparedEntry[] = [];
    const vocab = new Map<string, Posting[]>();

    entries.forEach((entry, i) => {
        prepared.push({
            entry,
            normTitle: normalizeText(entry.title),
            normText: normalizeText(entry.text ?? ''),
        });
        addPostings(vocab, i, FIELD_TITLE, tokenize(entry.title));
        addPostings(vocab, i, FIELD_KEYWORDS, tokenize((entry.keywords ?? []).join(' ')));
        addPostings(vocab, i, FIELD_PAGE, tokenize(entry.pageTitle ?? ''));
        const text = entry.text ?? '';
        addPostings(vocab, i, FIELD_TEXT, [...tokenize(text), ...phoneTokens(text)]);
    });

    const vocabKeys = [...vocab.keys()];

    const synonymList = Object.entries(options.synonyms ?? {}).map(([phrase, alts]) => ({
        phrase: normalizeText(phrase),
        alts: alts.map(normalizeText).filter(Boolean),
    })).filter((s) => s.phrase && s.alts.length > 0);

    /** Find vocabulary words that a query token could mean. */
    function matchToken(qt: string): TokenMatch[] {
        const matches: TokenMatch[] = [];
        for (const key of vocabKeys) {
            if (key === qt) {
                matches.push({ key, quality: 1 });
            } else if (qt.length >= 2 && key.startsWith(qt)) {
                matches.push({ key, quality: 0.75 * (0.6 + 0.4 * (qt.length / key.length)) });
            } else if (key.length >= 4 && qt.startsWith(key) && qt.length - key.length <= 2) {
                // Plural / suffix on the query: "suicides" → "suicide"
                matches.push({ key, quality: 0.7 });
            }
        }
        if (matches.length > 0 || qt.length < 4) return matches;

        // No direct hit: allow typos.
        const maxDist = qt.length >= 8 ? 2 : 1;
        for (const key of vocabKeys) {
            if (Math.abs(key.length - qt.length) > maxDist) continue;
            const d = editDistance(qt, key, maxDist);
            if (d <= maxDist) matches.push({ key, quality: 0.5 - 0.12 * (d - 1) });
        }
        return matches;
    }

    /** Score every entry for one concrete query string. */
    function scoreQuery(rawQuery: string): Map<number, { score: number; terms: Set<string> }> {
        let tokens = tokenize(rawQuery);
        const meaningful = tokens.filter((t) => !STOP_WORDS.has(t));
        if (meaningful.length > 0) tokens = meaningful;
        if (tokens.length === 0) return new Map();

        const normQuery = tokens.join(' ');
        // entry → per-token best score, plus matched doc words
        const perEntry = new Map<number, { tokenScores: number[]; terms: Set<string> }>();

        tokens.forEach((qt, tokenIndex) => {
            const best = new Map<number, number>(); // entry → best weighted quality
            const rest = new Map<number, number>(); // entry → sum of weaker fields
            const matchedKeysByEntry = new Map<number, Set<string>>();

            for (const m of matchToken(qt)) {
                const postings = vocab.get(m.key);
                if (!postings) continue;
                const perField = new Map<number, number>();
                for (const p of postings) {
                    const freq = p.field === FIELD_TEXT ? 1 + 0.1 * Math.min(p.count, 5) : 1;
                    const s = m.quality * FIELD_WEIGHTS[p.field] * freq;
                    const key = p.entry * 8 + p.field;
                    perField.set(key, Math.max(perField.get(key) ?? 0, s));
                    let keys = matchedKeysByEntry.get(p.entry);
                    if (!keys) {
                        keys = new Set();
                        matchedKeysByEntry.set(p.entry, keys);
                    }
                    keys.add(m.key);
                }
                for (const [k, s] of perField) {
                    const entry = Math.floor(k / 8);
                    const cur = best.get(entry) ?? 0;
                    if (s > cur) {
                        if (cur > 0) rest.set(entry, (rest.get(entry) ?? 0) + cur);
                        best.set(entry, s);
                    } else {
                        rest.set(entry, (rest.get(entry) ?? 0) + s);
                    }
                }
            }

            for (const [entry, s] of best) {
                const tokenScore = s + 0.15 * (rest.get(entry) ?? 0);
                let rec = perEntry.get(entry);
                if (!rec) {
                    rec = { tokenScores: new Array(tokens.length).fill(0), terms: new Set() };
                    perEntry.set(entry, rec);
                }
                rec.tokenScores[tokenIndex] = tokenScore;
                for (const k of matchedKeysByEntry.get(entry) ?? []) rec.terms.add(k);
            }
        });

        const out = new Map<number, { score: number; terms: Set<string> }>();
        for (const [entryIndex, rec] of perEntry) {
            if (rec.tokenScores.some((s) => s === 0)) continue; // AND semantics
            let score = rec.tokenScores.reduce((a, b) => a + b, 0);
            const p = prepared[entryIndex];
            if (p.normTitle === normQuery) score += 10;
            else if (p.normTitle.startsWith(normQuery)) score += 5;
            else if (` ${p.normTitle} `.includes(` ${normQuery} `)) score += 3;
            if (tokens.length > 1 && ` ${p.normText} `.includes(` ${normQuery} `)) score += 3;
            if (p.entry.kind === 'page') score += 1;
            score += (p.entry.priority ?? 0) * 2;
            out.set(entryIndex, { score, terms: rec.terms });
        }
        return out;
    }

    function expand(query: string): Array<{ query: string; weight: number }> {
        const nq = normalizeText(query);
        const variants = [{ query, weight: 1 }];
        for (const { phrase, alts } of synonymList) {
            if (!` ${nq} `.includes(` ${phrase} `)) continue;
            for (const alt of alts) {
                variants.push({ query: ` ${nq} `.replace(` ${phrase} `, ` ${alt} `).trim(), weight: 0.85 });
            }
        }
        return variants;
    }

    function buildSnippet(entry: SearchEntry, terms: Set<string>): SearchSnippet | undefined {
        const text = entry.text?.trim();
        if (!text) return undefined;
        const words = [...text.matchAll(WORD_RE)];
        const hit = words.findIndex((w) => terms.has(normalizeText(w[0])));
        const startChar = hit === -1 ? 0 : Math.max(0, (words[hit].index ?? 0) - Math.floor(snippetLength / 3));
        // Snap to a word boundary
        let start = startChar;
        if (start > 0) {
            const space = text.indexOf(' ', start);
            if (space !== -1 && space - start < 20) start = space + 1;
        }
        let end = Math.min(text.length, start + snippetLength);
        if (end < text.length) {
            const space = text.lastIndexOf(' ', end);
            if (space > start + snippetLength / 2) end = space;
        }
        const prefix = start > 0 ? '…' : '';
        const suffix = end < text.length ? '…' : '';
        const slice = text.slice(start, end);
        const ranges: Array<[number, number]> = [];
        for (const w of slice.matchAll(WORD_RE)) {
            if (terms.has(normalizeText(w[0]))) {
                const s = (w.index ?? 0) + prefix.length;
                ranges.push([s, s + w[0].length]);
            }
        }
        return { text: prefix + slice + suffix, ranges };
    }

    function titleRanges(title: string, terms: Set<string>): Array<[number, number]> {
        const ranges: Array<[number, number]> = [];
        for (const w of title.matchAll(WORD_RE)) {
            if (terms.has(normalizeText(w[0]))) ranges.push([w.index ?? 0, (w.index ?? 0) + w[0].length]);
        }
        return ranges;
    }

    return {
        size: entries.length,
        search(query: string, opts: SearchOptions = {}): SearchResult[] {
            const limit = opts.limit ?? 12;
            const perGroup = opts.perGroupLimit ?? 5;
            if (!query.trim()) return [];

            const merged = new Map<number, { score: number; terms: Set<string> }>();
            for (const variant of expand(query)) {
                for (const [idx, rec] of scoreQuery(variant.query)) {
                    const weighted = rec.score * variant.weight;
                    const existing = merged.get(idx);
                    if (!existing || weighted > existing.score) {
                        merged.set(idx, { score: weighted, terms: rec.terms });
                    } else {
                        for (const t of rec.terms) existing.terms.add(t);
                    }
                }
            }

            const sorted = [...merged.entries()].sort((a, b) => b[1].score - a[1].score);
            const counts = new Map<string, number>();
            const results: SearchResult[] = [];
            for (const [idx, rec] of sorted) {
                const entry = prepared[idx].entry;
                const kind = entry.kind ?? 'section';
                const used = counts.get(kind) ?? 0;
                if (used >= perGroup) continue;
                counts.set(kind, used + 1);
                results.push({
                    entry,
                    score: rec.score,
                    matchTerms: [...rec.terms],
                    snippet: buildSnippet(entry, rec.terms),
                    titleRanges: titleRanges(entry.title, rec.terms),
                });
                if (results.length >= limit) break;
            }
            return results;
        },
    };
}

// ─── Grouping ────────────────────────────────────────

export const DEFAULT_SEARCH_KINDS: SearchKindMap = {
    contact: { label: 'Quick help', order: 0 },
    page: { label: 'Pages', order: 1 },
    resource: { label: 'Resources', order: 2 },
    section: { label: 'Page sections', order: 3 },
};

/** Group ranked results by kind, ordered by the kind map. */
export function groupSearchResults(
    results: SearchResult[],
    kinds: SearchKindMap = DEFAULT_SEARCH_KINDS,
): SearchGroup[] {
    const groups = new Map<string, SearchGroup>();
    for (const r of results) {
        const kind = r.entry.kind ?? 'section';
        let g = groups.get(kind);
        if (!g) {
            g = {
                kind,
                label: kinds[kind]?.label ?? kind.charAt(0).toUpperCase() + kind.slice(1),
                results: [],
            };
            groups.set(kind, g);
        }
        g.results.push(r);
    }
    return [...groups.values()].sort(
        (a, b) => (kinds[a.kind]?.order ?? 50) - (kinds[b.kind]?.order ?? 50),
    );
}
