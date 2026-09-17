import {
    useState,
    useEffect,
    useRef,
    
    type ReactNode,
} from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';
import { Topbar } from './Topbar';
import { Navbar, type NavbarItem } from './Navbar';
import { Footer } from './Footer';
import {
    departmentsItems,
    residentsItems,
    visitorsItems,
    businessItems,
    communitiesItems,
    howDoIItems,
    type NavItem 
} from '../data/countyNavItems';

// ─── Types ───────────────────────────────────────────

export interface LayoutProps {
    children: ReactNode;

    /**
     * Department name — e.g. "Community Services", "Sustainability Toolkit".
     * Rendered in the Navbar brand and in the Footer title.
     * Set it once here; it flows to both automatically.
     */
    siteTitle: string;

    // ── Shell toggles (all default true) ──
    /** Show the county-wide utility row above the navbar. @default true */
    showTopbar?: boolean;
    /** Show the brand navbar. @default true */
    showNavbar?: boolean;
    /** Show the footer. @default true */
    showFooter?: boolean;

    // ── Navbar config ──
    /**
     * Top-level nav items. Pass [] for seal + title only (no nav links).
     * Maximum 8 items. Each item can be a plain NavLink or a NavDropdown.
     * @default []
     */
    navItems?: NavbarItem[];
    /** Show the search input UI in the navbar. @default false */
    showSearch?: boolean;
    /** Called when the user submits a search query. Logic lives on the site. */
    onSearch?: (query: string) => void;

    // ── Footer overrides ──
    /** @default "518-891-2280" */
    footerPhone?: string;
    /** @default "36 Church St / Saranac Lake, NY 12983 / P.O. Box 1337" */
    footerAddress?: ReactNode;

    // ── Hero section (all optional) ──
    heroImage?: string;
    heroVideo?: string;
    heroTitle?: string;
    heroSubtitle?: string;

    // ── Custom theme override ──
    /** Provide a custom theme to override the default shared theme */
    theme?: any;
}

// ─── Mobile nav item type ─────────────────────────────

interface FlatMobileItem {
    label: string;
    url: string;
    groupLabel?: string;
}

// Flatten navItems + their sub-items for the mobile overlay
function flattenForMobile(navItems: NavbarItem[]): FlatMobileItem[] {
    const result: FlatMobileItem[] = [];
    for (const item of navItems) {
        if (item.items && item.items.length > 0) {
            for (const sub of item.items) {
                result.push({ label: sub.label, url: sub.url, groupLabel: item.label });
                if (sub.subItems) {
                    for (const deepSub of sub.subItems) {
                        result.push({ label: deepSub.label, url: deepSub.url, groupLabel: item.label });
                    }
                }
            }
        } else if (item.url) {
            result.push({ label: item.label, url: item.url });
        }
    }
    return result;
}

// ─── Inner layout (inside ThemeProvider) ─────────────

function LayoutInner({
    children,
    siteTitle,
    showTopbar = true,
    showNavbar = true,
    showFooter = true,
    navItems = [],
    showSearch = false,
    onSearch,
    footerPhone,
    footerAddress,
}: LayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(80);
    const location = useLocation();
    const { theme } = useTheme();
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const layoutRef = useRef<HTMLDivElement>(null);

    // Detect mobile/tablet UA to force hamburger
    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
        const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
        const isIPad = /macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
        setIsMobileOrTablet(!!(isMobileUA || isIPad));
    }, []);

    // Scroll shrink effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Measure header height and expose as CSS variable so consuming apps can use it
    useEffect(() => {
        if (!headerRef.current || !layoutRef.current) return;
        const update = () => {
            const h = headerRef.current!.offsetHeight;
            setHeaderHeight(h);
            layoutRef.current!.style.setProperty('--fc-header-height', `${h}px`);
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(headerRef.current);
        return () => ro.disconnect();
    }, [showTopbar, isScrolled]);

    // Close mobile menu on route change
    useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

    // Auto-close mobile menu on desktop resize
    useEffect(() => {
        const mql = window.matchMedia('(min-width: 1280px)'); // xl breakpoint
        const handleMatch = (e: MediaQueryListEvent | MediaQueryList) => {
            if (e.matches) {
                setIsMobileMenuOpen(false);
            }
        };
        // Initial check
        handleMatch(mql);
        
        mql.addEventListener('change', handleMatch);
        return () => mql.removeEventListener('change', handleMatch);
    }, []);


    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    // Focus management: mobile menu open → first item; closed → hamburger
    useEffect(() => {
        if (isMobileMenuOpen && mobileMenuRef.current) {
            const first = mobileMenuRef.current.querySelector<HTMLElement>(
                'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
            );
            first?.focus();
        } else if (!isMobileMenuOpen) {
            hamburgerRef.current?.focus();
        }
    }, [isMobileMenuOpen]);

    // Focus trap for mobile menu

    const flatMobileItems = flattenForMobile(navItems);

    return (
        <div ref={layoutRef} className="min-h-screen flex flex-col font-sans text-county-charcoal">

            {/* Skip to main content */}
            <a href="#fc-main-content" className="skip-to-content">
                Skip to main content
            </a>

            {/* ── STICKY HEADER ── */}
            {showNavbar && (
                <header
                    ref={headerRef}
                    role="banner"
                    className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'py-2 shadow-2xl' : 'py-4 text-shadow'}`}
                    style={{ 
                        backgroundColor: theme.colors.primary.DEFAULT,
                        background: theme.colors.bg.header 
                    }}
                >
                    <div className="container mx-auto px-6">
                        {/* Topbar row */}
                        {showTopbar && <Topbar />}
                        {/* Brand + nav row */}
                        <Navbar
                            siteTitle={siteTitle}
                            navItems={navItems}
                            showTopbar={showTopbar}
                            showSearch={showSearch}
                            onSearch={onSearch}
                            isMobileMenuOpen={isMobileMenuOpen}
                            onMobileMenuToggle={() => setIsMobileMenuOpen(prev => !prev)}
                            isMobileOrTablet={isMobileOrTablet}
                            isScrolled={isScrolled}
                        />
                    </div>
                </header>
            )}

            {/* ── MOBILE FULL-SCREEN OVERLAY ── */}
            {showNavbar && (
                <nav
                    id="fc-mobile-nav"
                    ref={mobileMenuRef as React.RefObject<HTMLElement>}
                    aria-label="Mobile navigation"
                    aria-hidden={!isMobileMenuOpen}
                    {...(!isMobileMenuOpen ? { inert: true } : {})}
                    className={`fixed inset-0 z-[45] flex flex-col transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
                    style={{ backgroundColor: '#ffffff', background: theme.colors.bg.sidebar }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') { setIsMobileMenuOpen(false); return; }
                    }}
                >
                    <div className="overflow-y-auto flex-1 pt-32 pb-8" tabIndex={0} role="region" aria-label="Mobile Navigation Content">
                        <div className="container mx-auto px-6">
                                                        {/* Mobile search */}
                            {showSearch && (
                                <div className="px-6 w-full max-w-md mx-auto mb-10">
                                    <form
                                        role="search"
                                        aria-label="Site search"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const input = (e.currentTarget.elements.namedItem('q') as HTMLInputElement);
                                            if (input.value.trim() && onSearch) { onSearch(input.value.trim()); input.value = ''; }
                                        }}
                                        className="w-full"
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="search"
                                                name="q"
                                                placeholder="Search..."
                                                aria-label="Search"
                                                className="w-full px-4 py-3 pr-12 text-base rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 placeholder-white/70"
                                                style={{
                                                    backgroundColor: theme.colors.primary.DEFAULT,
                                                    borderColor: theme.colors.primary.dark,
                                                    color: theme.colors.text.onDark,
                                                }}
                                            />
                                            <button
                                                type="submit"
                                                aria-label="Submit search"
                                                className="absolute right-3 p-1 transition-colors"
                                                style={{ color: theme.colors.text.onDark }}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Mobile nav items */}
                            <nav className="flex flex-col gap-8 text-center mb-12" aria-label="Mobile site navigation">
                                {navItems.map((item, i) => {
                                    if (item.items && item.items.length > 0) {
                                        // Group with sub-items
                                        const subItems: NavItem[] = item.items;
                                        return (
                                            <div key={i} className="space-y-1">
                                                <span
                                                    className="text-sm font-black uppercase tracking-[0.2em] mb-3 mt-4 block text-center"
                                                    style={{ color: theme.colors.secondary.dark }}
                                                >
                                                    {item.label}
                                                </span>
                                                <div className="flex flex-col gap-1">
                                                    {subItems.map((sub, j) => (
                                                        <NavLink
                                                            key={j}
                                                            to={sub.url}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block w-full text-center text-[13px] font-bold uppercase tracking-widest transition-all duration-200 py-3 px-6 rounded-xl interactive-effect"
                                                            style={({ isActive }) => ({
                                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}10` : 'transparent',
                                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                                                borderRight: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                                            })}
                                                        >
                                                            {sub.label}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                    // Plain nav link
                                    return (
                                        <NavLink
                                            key={i}
                                            to={item.url || '/'}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full text-center text-[13px] font-bold uppercase tracking-widest transition-all duration-200 py-3 px-6 rounded-xl interactive-effect"
                                            style={({ isActive }) => ({
                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}10` : 'transparent',
                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                                borderRight: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                            })}
                                        >
                                            {item.label}
                                        </NavLink>
                                    );
                                })}
                            </nav>

                            {/* Mobile flat item list (for items with deep sub-items) */}
                            {flatMobileItems.length > 0 && navItems.some(i => i.items) && (
                                <div className="border-t my-6 max-w-md mx-auto" style={{ borderColor: `${theme.colors.secondary.DEFAULT}4D` }} />
                            )}

                            {/* Topbar Items (County-wide navigation) */}
                            {showTopbar && (
                                <>
                                    {navItems.length > 0 && (
                                        <div className="border-t my-6 max-w-md mx-auto" style={{ borderColor: `${theme.colors.secondary.DEFAULT}4D` }} />
                                    )}

                                    <div className="max-w-md mx-auto space-y-6 pb-12">
                                        {[
                                            { title: 'Departments', items: departmentsItems, url: 'https://www.franklincountyny.gov/departments/index.php' },
                                            { title: 'Residents', items: residentsItems, url: 'https://www.franklincountyny.gov/residents/index.php' },
                                            { title: 'Visitors', items: visitorsItems, url: 'https://www.franklincountyny.gov/visitors/index.php' },
                                            { title: 'Business', items: businessItems, url: 'https://www.franklincountyny.gov/business/index.php' },
                                            { title: 'Our Communities', items: communitiesItems, url: 'https://www.franklincountyny.gov/our_communities/index.php' },
                                            { title: 'How Do I?', items: howDoIItems, url: 'https://www.franklincountyny.gov/how_do_i/index.php' },
                                        ].map((section, idx) => (
                                            <div key={idx}>
                                                <a href={section.url} target="_blank" rel="noopener noreferrer" className="block text-center mb-3">
                                                    <h3 className="text-xs font-bold uppercase tracking-widest inline-block" style={{ color: theme.colors.secondary.dark }}>
                                                        {section.title}
                                                    </h3>
                                                </a>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {section.items.map((item: NavItem, i: number) => (
                                                        <a
                                                            key={i}
                                                            href={item.url}
                                                            target={item.url?.startsWith('http') ? '_blank' : undefined}
                                                            rel={item.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                            className="block w-full text-center text-xs transition-all duration-200 py-2 px-2 rounded-lg interactive-effect"
                                                            style={{ color: theme.colors.text.primary }}
                                                        >
                                                            {item.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            )}

            {/* ── MAIN CONTENT ── */}
            <main
                id="fc-main-content"
                className="grow"
                style={{ background: theme.colors.bg.main, paddingTop: showNavbar ? headerHeight : 0 }}
                {...(isMobileMenuOpen ? { "inert": true } : {})}
            >
                {/* Page content */}
                {children}
            </main>

            {/* ── FOOTER ── */}
            {showFooter && (
                <div {...(isMobileMenuOpen ? { "inert": true } : {})}>
                    <Footer
                        siteTitle={siteTitle}
                        phone={footerPhone}
                        address={footerAddress}
                    />
                </div>
            )}
        </div>
    );
}

// ─── Layout (public export — wraps LayoutInner in ThemeProvider) ─────

/**
 * Layout — The shared page shell for all Franklin County sites.
 *
 * Wrap each page in this component. Controls which shell elements are shown
 * (topbar, navbar, footer) and passes siteTitle once to both Navbar and Footer.
 *
 * @example
 * // pages/HomePage.tsx
 * export default function HomePage() {
 *   return (
 *     <Layout siteTitle="Community Services" navItems={csNavItems} showTopbar>
 *       <HomeContent />
 *     </Layout>
 *   );
 * }
 */
export default function Layout({ theme, ...props }: LayoutProps) {
    return (
        <ThemeProvider theme={theme}>
            <LayoutInner {...props} />
        </ThemeProvider>
    );
}
