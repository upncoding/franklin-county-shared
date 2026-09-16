import { NavLink } from 'react-router-dom';
import seal from '../assets/seal.png';
import { useTheme } from '../theme/ThemeContext';
import { NavDropdown } from './NavDropdown';
import type { NavItem } from '../data/countyNavItems';

// ─── Types ───────────────────────────────────────────

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
    /** Show the search input UI. Fires onSearch when submitted. */
    showSearch?: boolean;
    /** Search handler — logic lives on the consuming site. Required when showSearch=true. */
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

// ─── Internal: Plain nav link ─────────────────────────

const MainNavLink = ({
    to,
    label,
    onClick,
    textColor,
}: {
    to: string;
    label: string;
    onClick?: () => void;
    textColor?: string;
}) => {
    const { theme } = useTheme();
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `block w-full text-center text-2xl md:text-sm font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl active:scale-95 ${isActive ? '' : 'interactive-effect'}`
            }
            style={({ isActive }) => ({
                color: isActive ? theme.colors.secondary.DEFAULT : (textColor || theme.colors.text.primary),
                backgroundColor: isActive ? `${theme.colors.secondary.DEFAULT}10` : 'transparent',
            })}
        >
            {label}
        </NavLink>
    );
};

// ─── Internal: Search input ───────────────────────────

const SearchInput = ({
    onSearch,
    isMobile = false,
}: {
    onSearch?: (query: string) => void;
    isMobile?: boolean;
}) => {
    const { theme } = useTheme();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem('q') as HTMLInputElement;
        if (input.value.trim() && onSearch) {
            onSearch(input.value.trim());
            input.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit} role="search" aria-label="Site search" className={isMobile ? 'w-full' : ''}>
            <div className="relative flex items-center">
                <input
                    type="search"
                    name="q"
                    placeholder="Search..."
                    aria-label="Search"
                    className={`${isMobile ? 'w-full' : 'w-48'} px-4 py-2 pr-10 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2`}
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: theme.colors.text.onDark,
                    }}
                />
                <button
                    type="submit"
                    aria-label="Submit search"
                    className="absolute right-2 p-1 transition-colors"
                    style={{ color: theme.colors.text.onDark }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

// ─── Navbar ───────────────────────────────────────────

/**
 * Navbar — Brand bar with Franklin County seal, site title, and configurable nav items.
 *
 * Rendered internally by Layout. Mobile hamburger state and scroll state are
 * owned by Layout and passed down as props so Layout can coordinate the overlay.
 */
export const Navbar = ({
    siteTitle,
    navItems = [],
    showTopbar = false,
    showSearch = false,
    onSearch,
    isMobileMenuOpen,
    onMobileMenuToggle,
    isMobileOrTablet,
    isScrolled,
}: NavbarProps) => {
    const { theme } = useTheme();
    const headerTextColor = theme.colors.text.onDark;
    const isDesktopNavHidden = isMobileOrTablet;

    // Cap at 8 items and warn in dev
    const cappedItems = navItems.slice(0, 8);
    if (process.env.NODE_ENV !== 'production' && navItems.length > 8) {
        console.warn(
            `[Navbar] navItems exceeds the 8-item maximum. Only the first 8 will be rendered.`
        );
    }

    return (
        <div className="flex justify-between items-center">
            {/* ── Brand Identity ── */}
            <div className="flex items-center gap-4">
                <div className="relative group shrink-0">
                    {/* Gold glow on hover */}
                    <div className="absolute -inset-1 bg-linear-to-r from-county-gold-light to-county-gold rounded-full opacity-0 group-hover:opacity-30 blur transition duration-300" />
                    <img
                        src={seal}
                        alt="Franklin County Seal"
                        className={`relative transition-all duration-500 object-contain ${isScrolled || isMobileMenuOpen ? 'h-12 w-12' : 'h-16 w-16 md:h-20 md:w-20'}`}
                    />
                </div>
                <div className="flex flex-col transition-opacity duration-300 opacity-100" style={{ color: headerTextColor }}>
                    <span className="text-xs uppercase tracking-[0.3em] font-light leading-tight">Franklin County</span>
                    <span className="font-serif font-black text-xl md:text-2xl leading-none tracking-tight">{siteTitle}</span>
                </div>
            </div>

            {/* ── Desktop Navigation ── */}
            {cappedItems.length > 0 && (
                <nav
                    className={`${isDesktopNavHidden ? 'hidden' : 'hidden xl:flex'} items-center gap-4`}
                    aria-label="Main navigation"
                >
                    {cappedItems.map((item, i) =>
                        item.items && item.items.length > 0 ? (
                            <NavDropdown
                                key={i}
                                label={item.label}
                                url={item.url}
                                items={item.items}
                                columns={item.columns}
                                textColor={headerTextColor}
                                variant={item.variant}
                            />
                        ) : (
                            <MainNavLink
                                key={i}
                                to={item.url || '/'}
                                label={item.label}
                                textColor={headerTextColor}
                            />
                        )
                    )}
                    {showSearch && <SearchInput onSearch={onSearch} />}
                </nav>
            )}

            {/* ── Hamburger (mobile/tablet + xl if no nav items) ── */}
            {(navItems.length > 0 || showTopbar) && (
                <button
                    type="button"
                    className={`${isMobileOrTablet ? 'block' : 'xl:hidden'} p-2 cursor-pointer transition-opacity rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-county-gold`}
                    style={{ color: headerTextColor }}
                    onClick={onMobileMenuToggle}
                    aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="fc-mobile-nav"
                    onMouseEnter={(e) => {
                        e.currentTarget.querySelectorAll('span').forEach(s => s.style.backgroundColor = theme.colors.secondary.DEFAULT);
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.querySelectorAll('span').forEach(s => s.style.backgroundColor = headerTextColor);
                    }}
                >
                    <div className="space-y-1.5" aria-hidden="true">
                        <span className="block w-8 h-0.5 transition-all duration-300"
                            style={{ backgroundColor: headerTextColor, transform: isMobileMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
                        <span className={`block w-8 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                            style={{ backgroundColor: headerTextColor }} />
                        <span className="block w-8 h-0.5 transition-all duration-300"
                            style={{ backgroundColor: headerTextColor, transform: isMobileMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
                    </div>
                </button>
            )}
        </div>
    );
};
