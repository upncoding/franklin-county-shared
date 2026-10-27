// =====================================================
// SEARCH — <SearchBox />
//
// Themed, accessible search combobox. Reusable by any Franklin County site:
//   <SearchBox indexUrl="/search-index.json" />
// or let <Layout search={…}> render it in the navbar for you.
// =====================================================

import {
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent,
    type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { DEFAULT_SEARCH_KINDS, groupSearchResults } from './engine';
import { buildSearchUrl } from './navigation';
import { useSearchEngine } from './useSearchEngine';
import type { SearchConfig, SearchLabels, SearchResult } from './types';

// ─── Props ───────────────────────────────────────────

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

const DEFAULT_LABELS: Required<SearchLabels> = {
    placeholder: 'Search...',
    inputLabel: 'Search this site',
    noResults: 'No results found.',
    suggestionsHeading: 'Try searching for',
    keyboardHint: '↑↓ to move · Enter to open · Esc to close',
};

// ─── Small pieces ────────────────────────────────────

const Icon = ({ d, className = 'w-4 h-4' }: { d: string; className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
);

const ICON_PATHS = {
    search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    close: 'M6 18L18 6M6 6l12 12',
    phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    page: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    section: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14',
    place: 'M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
} as const;

function kindIcon(kind: string | undefined): string {
    switch (kind) {
        case 'contact': return ICON_PATHS.phone;
        case 'page': return ICON_PATHS.page;
        case 'resource': return ICON_PATHS.place;
        default: return ICON_PATHS.section;
    }
}

/** Render text with emphasised ranges. */
function Marked({ text, ranges, color, bg }: {
    text: string;
    ranges: Array<[number, number]>;
    color: string;
    bg: string;
}) {
    if (ranges.length === 0) return <>{text}</>;
    const parts: ReactNode[] = [];
    let last = 0;
    [...ranges].sort((a, b) => a[0] - b[0]).forEach(([s, e], i) => {
        if (s < last) return;
        if (s > last) parts.push(text.slice(last, s));
        parts.push(
            <mark key={i} className="rounded-sm px-0.5 font-semibold" style={{ backgroundColor: bg, color }}>
                {text.slice(s, e)}
            </mark>,
        );
        last = e;
    });
    if (last < text.length) parts.push(text.slice(last));
    return <>{parts}</>;
}

// ─── Component ───────────────────────────────────────

export function SearchBox({
    variant = 'header',
    dropdown = 'floating',
    align = 'right',
    className = '',
    shortcut = false,
    expandable,
    onNavigate,
    onSelect,
    onSearch,
    autoFocus = false,
    indexUrl,
    entries,
    synonyms,
    kinds = DEFAULT_SEARCH_KINDS,
    labels,
    suggestions,
    emptyState,
    limit = 12,
    perGroupLimit = 5,
}: SearchBoxProps) {
    const isExpandable = expandable ?? (variant === 'header' && dropdown === 'floating');
    const { theme } = useTheme();
    const navigate = useNavigate();
    const text = { ...DEFAULT_LABELS, ...labels };

    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const uid = useId();
    const listId = `${uid}-list`;
    const optionId = (i: number) => `${uid}-opt-${i}`;

    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [active, setActive] = useState(-1);
    const [armed, setArmed] = useState(false); // user touched the field → load the index

    const { engine, status } = useSearchEngine({ indexUrl, entries, synonyms }, armed);

    const trimmed = query.trim();
    const isExpanded = isExpandable ? (isFocused || open || trimmed.length > 0) : true;
    const widthClass = isExpandable
        ? (isExpanded ? 'w-60 lg:w-72 xl:w-80 2xl:w-84 shrink-0' : 'w-36 lg:w-40 xl:w-44 2xl:w-48 shrink-0')
        : (dropdown === 'floating' ? 'shrink-0' : 'w-full');
    const results = useMemo(
        () => (engine && trimmed ? engine.search(trimmed, { limit, perGroupLimit }) : []),
        [engine, trimmed, limit, perGroupLimit],
    );
    const groups = useMemo(() => groupSearchResults(results, { ...DEFAULT_SEARCH_KINDS, ...kinds }), [results, kinds]);
    const flat = useMemo(() => groups.flatMap((g) => g.results), [groups]);

    const showSuggestions = open && !trimmed && !!suggestions?.length;
    const showPanel = open && (trimmed.length > 0 || showSuggestions);

    // Close when clicking/tapping outside.
    useEffect(() => {
        if (!open) return;
        const onDown = (e: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('pointerdown', onDown);
        return () => document.removeEventListener('pointerdown', onDown);
    }, [open]);

    // Global shortcut: "/" or Ctrl/⌘+K.
    useEffect(() => {
        if (!shortcut) return;
        const onKey = (e: globalThis.KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const typing = target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
            const slash = e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !typing;
            const cmdK = e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey);
            if (!slash && !cmdK) return;
            const input = inputRef.current;
            if (!input || input.offsetParent === null) return; // hidden (e.g. mobile)
            e.preventDefault();
            input.focus();
            input.select();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [shortcut]);

    const choose = useCallback((result: SearchResult) => {
        setOpen(false);
        setQuery('');
        setActive(-1);
        inputRef.current?.blur();
        onNavigate?.();
        if (onSelect) {
            onSelect(result);
            return;
        }
        const href = result.entry.href;
        if (href) {
            if (/^https?:\/\//i.test(href)) window.open(href, '_blank', 'noopener,noreferrer');
            else window.location.href = href;
            return;
        }
        navigate(buildSearchUrl(result));
    }, [navigate, onNavigate, onSelect]);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!open) setOpen(true);
                if (flat.length) setActive((i) => (i + 1) % flat.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!open) setOpen(true);
                if (flat.length) setActive((i) => (i <= 0 ? flat.length - 1 : i - 1));
                break;
            case 'Enter':
                if (!trimmed) break;
                e.preventDefault();
                if (flat.length) choose(flat[active >= 0 ? active : 0]);
                else onSearch?.(trimmed);
                break;
            case 'Escape':
                if (open) {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(false);
                } else if (query) {
                    setQuery('');
                }
                break;
            case 'Tab':
                setOpen(false);
                break;
        }
    };

    // Keep the active option scrolled into view inside the panel.
    useEffect(() => {
        if (active < 0) return;
        document.getElementById(optionId(active))?.scrollIntoView({ block: 'nearest' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    // ── Theme-driven styles ──
    const isHeader = variant === 'header';
    const fieldStyle = isHeader
        ? {
            backgroundColor: isExpanded ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.15)',
            borderColor: isExpanded ? theme.colors.secondary.DEFAULT : 'rgba(255,255,255,0.3)',
            color: theme.colors.text.onDark,
            boxShadow: isExpanded ? `0 0 0 1px ${theme.colors.secondary.DEFAULT}60` : 'none',
            '--tw-ring-color': theme.colors.secondary.DEFAULT,
        }
        : {
            backgroundColor: theme.colors.bg.card,
            borderColor: isExpanded ? theme.colors.secondary.DEFAULT : theme.colors.border,
            color: theme.colors.text.primary,
            '--tw-ring-color': theme.colors.secondary.DEFAULT,
        };
    const iconColor = isHeader ? theme.colors.text.onDark : theme.colors.text.muted;
    const markBg = `${theme.colors.secondary.light}99`;

    const statusMessage = !trimmed
        ? ''
        : status === 'loading'
            ? 'Loading search'
            : flat.length === 0
                ? text.noResults
                : `${flat.length} result${flat.length === 1 ? '' : 's'} available. Use arrow keys to review.`;

    let flatIndex = -1;

    return (
        <div ref={rootRef} className={`relative transition-all duration-300 ease-in-out ${widthClass} ${className}`}>
            <form
                role="search"
                aria-label={text.inputLabel}
                onSubmit={(e) => e.preventDefault()}
                className="relative flex items-center"
            >
                <span className="absolute left-3 pointer-events-none" style={{ color: iconColor }}>
                    <Icon d={ICON_PATHS.search} />
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    name="q"
                    value={query}
                    maxLength={100}
                    autoFocus={autoFocus}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="search"
                    placeholder={isExpandable && !isExpanded ? 'Search...' : text.placeholder}
                    aria-label={text.inputLabel}
                    aria-autocomplete="list"
                    aria-expanded={showPanel}
                    aria-controls={listId}
                    aria-activedescendant={showPanel && active >= 0 ? optionId(active) : undefined}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setActive(-1);
                        setOpen(true);
                        setArmed(true);
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                        setArmed(true);
                        setOpen(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    onPointerEnter={() => setArmed(true)}
                    onKeyDown={onKeyDown}
                    className={`w-full ${isHeader ? 'placeholder:text-white/70' : ''} pl-9 ${query ? 'pr-9' : 'pr-8'} py-2 text-sm rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2`}
                    style={fieldStyle as CSSProperties}
                />
                {query ? (
                    <button
                        type="button"
                        aria-label="Clear search"
                        className="absolute right-2 p-1 rounded-md transition-opacity opacity-80 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2"
                        style={{ color: iconColor, '--tw-ring-color': theme.colors.secondary.DEFAULT } as CSSProperties}
                        onClick={() => {
                            setQuery('');
                            setActive(-1);
                            inputRef.current?.focus();
                        }}
                    >
                        <Icon d={ICON_PATHS.close} />
                    </button>
                ) : shortcut ? (
                    <kbd
                        aria-hidden="true"
                        className="hidden md:block absolute right-2.5 px-1.5 rounded text-[10px] font-bold leading-4 border pointer-events-none transition-opacity duration-200"
                        style={{
                            color: iconColor,
                            borderColor: 'rgba(255,255,255,0.3)',
                            opacity: isExpanded ? 0.9 : 0.6,
                        }}
                    >
                        /
                    </kbd>
                ) : null}
            </form>

            <div role="status" aria-live="polite" className="sr-only">{statusMessage}</div>

            {/* ── Results panel ── */}
            <div
                hidden={!showPanel}
                className={`${dropdown === 'floating'
                    ? `absolute top-full mt-2 z-[60] w-[min(30rem,calc(100vw-2rem))] ${align === 'right' ? 'right-0' : 'left-0'}`
                    : 'mt-2 w-full'} rounded-2xl border overflow-hidden`}
                style={{
                    backgroundColor: theme.colors.bg.card,
                    borderColor: theme.colors.border,
                    boxShadow: `0 20px 50px -12px ${theme.colors.shadowDark}`,
                    color: theme.colors.text.primary,
                }}
            >
                <div className="max-h-[min(70vh,30rem)] overflow-y-auto overscroll-contain">
                    {showSuggestions && (
                        <div className="p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: theme.colors.secondary.dark }}>
                                {text.suggestionsHeading}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {suggestions!.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2"
                                        style={{
                                            backgroundColor: theme.colors.hover.button,
                                            color: theme.colors.text.primary,
                                            '--tw-ring-color': theme.colors.secondary.DEFAULT,
                                        } as CSSProperties}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            setQuery(s);
                                            setArmed(true);
                                            inputRef.current?.focus();
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {trimmed && status === 'loading' && (
                        <p className="p-4 text-sm" style={{ color: theme.colors.text.muted }}>Loading search…</p>
                    )}

                    {trimmed && status === 'error' && (
                        <p className="p-4 text-sm" style={{ color: theme.colors.text.muted }}>
                            Search is unavailable right now. Please use the menu to find what you need.
                        </p>
                    )}

                    {trimmed && status === 'ready' && flat.length === 0 && (
                        <div className="p-4 text-sm" style={{ color: theme.colors.text.muted }}>
                            <p className="font-semibold" style={{ color: theme.colors.text.primary }}>{text.noResults}</p>
                            {emptyState && <div className="mt-2">{emptyState}</div>}
                        </div>
                    )}

                    <div id={listId} role="listbox" aria-label="Search results">
                    {groups.map((group) => (
                        <div key={group.kind} role="group" aria-label={group.label}>
                            <div
                                className="px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-[0.2em]"
                                style={{ color: theme.colors.secondary.dark }}
                                aria-hidden="true"
                            >
                                {group.label}
                            </div>
                            {group.results.map((r) => {
                                flatIndex += 1;
                                const i = flatIndex;
                                const isActive = i === active;
                                const showCrumb = r.entry.kind !== 'page' && r.entry.pageTitle && r.entry.pageTitle !== r.entry.title;
                                return (
                                    <div
                                        key={r.entry.id}
                                        id={optionId(i)}
                                        role="option"
                                        aria-selected={isActive}
                                        className="flex gap-3 px-4 py-2.5 cursor-pointer border-l-4 transition-colors"
                                        style={{
                                            backgroundColor: isActive ? theme.colors.hover.card : 'transparent',
                                            borderLeftColor: isActive ? theme.colors.secondary.DEFAULT : 'transparent',
                                        }}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onMouseMove={() => active !== i && setActive(i)}
                                        onClick={() => choose(r)}
                                    >
                                        <span className="mt-0.5 shrink-0" style={{ color: theme.colors.secondary.dark }}>
                                            <Icon d={kindIcon(r.entry.kind)} className="w-4 h-4" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-sm font-bold leading-snug">
                                                <Marked text={r.entry.title} ranges={r.titleRanges} color={theme.colors.text.primary} bg={markBg} />
                                            </span>
                                            {showCrumb && (
                                                <span className="block text-[11px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: theme.colors.text.muted }}>
                                                    {r.entry.pageTitle}
                                                </span>
                                            )}
                                            {r.snippet && r.snippet.text && (
                                                <span
                                                    className="block text-xs leading-relaxed mt-1 line-clamp-2"
                                                    style={{ color: theme.colors.text.muted }}
                                                >
                                                    <Marked text={r.snippet.text} ranges={r.snippet.ranges} color={theme.colors.text.primary} bg={markBg} />
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    </div>
                </div>

                {text.keyboardHint && flat.length > 0 && (
                    <div
                        className="hidden md:block px-4 py-2 text-[11px] border-t"
                        style={{ color: theme.colors.text.muted, borderColor: theme.colors.border }}
                        aria-hidden="true"
                    >
                        {text.keyboardHint}
                    </div>
                )}
            </div>
        </div>
    );
}
