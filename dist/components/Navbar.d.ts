import type React from 'react';
import type { SearchConfig } from '../search/types';
import type { NavItem } from '../data/countyNavItems';
export interface NavbarItem {
    label: string;
    /** If omitted or '#', renders as a dropdown-only button trigger */
    url?: string;
    /** If provided, renders as a NavDropdown; otherwise a plain NavLink */
    items?: NavItem[];
    columns?: number;
    variant?: 'standard' | 'fullWidth';
}
export interface NavbarProps {
    /** Department name, e.g. "Community Services". Rendered below "Franklin County". */
    siteTitle: string;
    /** Up to 8 top-level nav items. Pass [] for seal + title only. */
    navItems?: NavbarItem[];
    /** Whether the topbar is enabled (used to determine if hamburger menu should render) */
    showTopbar?: boolean;
    /** Show the search input UI. */
    showSearch?: boolean;
    /**
     * Full-featured shared search (suggestions, grouped results, navigate-to-match).
     * Takes precedence over the plain `onSearch` form.
     */
    search?: SearchConfig;
    /** Plain-form fallback handler, or the "no results → Enter" handler when `search` is set. */
    onSearch?: (query: string) => void;
    /** Controlled: whether the mobile menu is open */
    isMobileMenuOpen: boolean;
    /** Setter for mobile menu state (owned by Layout) */
    onMobileMenuToggle: () => void;
    /** Whether device is detected as mobile/tablet (forces hamburger) */
    isMobileOrTablet: boolean;
    /** Whether the header is scrolled (controls size shrink) */
    isScrolled: boolean;
}
/**
 * Navbar — Brand bar with Franklin County seal, site title, and configurable nav items.
 *
 * Rendered internally by Layout. Mobile hamburger state and scroll state are
 * owned by Layout and passed down as props so Layout can coordinate the overlay.
 */
export declare const Navbar: ({ siteTitle, navItems, showTopbar, showSearch, search, onSearch, isMobileMenuOpen, onMobileMenuToggle, isMobileOrTablet, isScrolled, }: NavbarProps) => React.JSX.Element;
