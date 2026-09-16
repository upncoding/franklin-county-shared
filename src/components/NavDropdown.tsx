import { useState, useRef, useEffect, forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import type { NavItem } from '../data/countyNavItems';

// ─── Types ───────────────────────────────────────────

export interface NavDropdownProps {
    label: string;
    url?: string;
    items: NavItem[];
    columns?: number;
    textColor?: string;
    variant?: 'standard' | 'fullWidth';
}

interface NavLinkOrAProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    item: NavItem | { label: string; url: string };
    children: React.ReactNode;
}

// ─── Internal Helper ─────────────────────────────────

/**
 * Renders a react-router <Link> for internal paths and a plain <a> for external URLs.
 */
const NavLinkOrA = forwardRef<HTMLAnchorElement, NavLinkOrAProps>(
    ({ item, className, style, children, ...rest }, ref) => {
        const isExternal = item.url.startsWith('http');
        if (isExternal) {
            return (
                <a
                    ref={ref}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    style={style}
                    {...rest}
                >
                    {children}
                </a>
            );
        }
        return (
            <Link
                ref={ref as React.Ref<HTMLAnchorElement>}
                to={item.url}
                className={className}
                style={style}
                {...(rest as any)}
            >
                {children}
            </Link>
        );
    }
);
NavLinkOrA.displayName = 'NavLinkOrA';

// ─── NavDropdown Component ────────────────────────────

export const NavDropdown = ({
    label,
    url = '#',
    items,
    columns = 1,
    textColor,
    variant = 'standard',
}: NavDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuTop, setMenuTop] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);
    const enterTimeoutRef = useRef<number | null>(null);
    // Track whether this open was keyboard-triggered to avoid stealing focus on mouse hover
    const openedByKeyboard = useRef(false);
    const { theme } = useTheme();
    const location = useLocation();

    // Stable unique ID for aria-controls
    const menuId = `nav-menu-${label.replace(/\s+/g, '-').toLowerCase()}`;

    // Highlight trigger if current route matches any sub-item
    const isSubItemActive = items.some(item => {
        if (location.pathname === item.url) return true;
        if (item.subItems) {
            return item.subItems.some(sub => location.pathname === sub.url);
        }
        return false;
    });
    const isActive = location.pathname === url || isSubItemActive;

    // Broadcast open so sibling dropdowns close themselves
    const openThisMenu = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Optional padding so it doesn't touch the text perfectly
            setMenuTop(rect.bottom + 8); 
        }
        window.dispatchEvent(new CustomEvent('navdropdown:opened', { detail: { menuId } }));
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
        openedByKeyboard.current = false;
        triggerRef.current?.focus();
    };

    // Close when another dropdown opens
    useEffect(() => {
        const handleOtherOpened = (e: CustomEvent<{ menuId: string }>) => {
            if (e.detail.menuId !== menuId) {
                setIsOpen(false);
                openedByKeyboard.current = false;
            }
        };
        window.addEventListener('navdropdown:opened', handleOtherOpened as EventListener);
        return () => window.removeEventListener('navdropdown:opened', handleOtherOpened as EventListener);
    }, [menuId]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                openedByKeyboard.current = false;
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Focus first item only when opened via keyboard
    useEffect(() => {
        if (isOpen && openedByKeyboard.current && menuRef.current) {
            const firstItem = menuRef.current.querySelector<HTMLElement>('a, button');
            firstItem?.focus();
        }
    }, [isOpen]);

    // Keyboard: link trigger (Enter navigates, Space/ArrowDown opens)
    const handleLinkTriggerKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            openedByKeyboard.current = true;
            openThisMenu();
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            openedByKeyboard.current = false;
        }
    };

    // Keyboard: button trigger (Enter/Space/ArrowDown all open)
    const handleButtonTriggerKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            openedByKeyboard.current = true;
            if (!isOpen) openThisMenu();
            else setIsOpen(false);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            openedByKeyboard.current = false;
        }
    };

    // Keyboard: items inside menu
    const handleMenuKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeMenu();
            return;
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!menuRef.current) return;
            const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'));
            const idx = focusable.indexOf(document.activeElement as HTMLElement);
            if (e.key === 'ArrowDown') focusable[(idx + 1) % focusable.length]?.focus();
            else focusable[(idx - 1 + focusable.length) % focusable.length]?.focus();
        }
        if (e.key === 'Tab') {
            const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []);
            const last = focusable[focusable.length - 1];
            if (!e.shiftKey && document.activeElement === last) setIsOpen(false);
            if (e.shiftKey && document.activeElement === focusable[0]) {
                e.preventDefault();
                closeMenu();
            }
        }
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
        if (!isOpen && !enterTimeoutRef.current) {
            enterTimeoutRef.current = window.setTimeout(() => {
                openThisMenu();
                enterTimeoutRef.current = null;
            }, 150);
        }
    };

    const handleMouseLeave = () => {
        if (enterTimeoutRef.current) { window.clearTimeout(enterTimeoutRef.current); enterTimeoutRef.current = null; }
        timeoutRef.current = window.setTimeout(() => {
            setIsOpen(false);
            timeoutRef.current = null;
        }, 300);
    };

    const getGridClass = () => {
        switch (columns) {
            case 2: return 'md:grid-cols-2';
            case 3: return 'md:grid-cols-3';
            case 4: return 'md:grid-cols-4';
            default: return 'md:grid-cols-1';
        }
    };

    const triggerColor = (isOpen || isActive)
        ? theme.colors.secondary.DEFAULT
        : (textColor || 'rgba(255, 255, 255, 0.9)');

    const sharedTriggerClass =
        'mx-4 my-2 text-xs font-bold uppercase tracking-widest transition-colors inline-block relative z-20 bg-transparent border-0 cursor-pointer p-0';

    return (
        <div ref={dropdownRef} className="relative inline-block" onMouseLeave={handleMouseLeave}>
            {/* Trigger */}
            {url !== '#' ? (
                <NavLinkOrA
                    ref={triggerRef as React.Ref<HTMLAnchorElement>}
                    item={{ label, url }}
                    
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    className={sharedTriggerClass}
                    style={{ color: triggerColor }}
                    onMouseEnter={handleMouseEnter}
                    onKeyDown={handleLinkTriggerKeyDown}
                >
                    {label}
                </NavLinkOrA>
            ) : (
                <button
                    ref={triggerRef as React.Ref<HTMLButtonElement>}
                    type="button"
                    
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    className={sharedTriggerClass}
                    style={{ color: triggerColor }}
                    onMouseEnter={handleMouseEnter}
                    onKeyDown={handleButtonTriggerKeyDown}
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {label}
                </button>
            )}

            {/* Menu */}
            {variant === 'fullWidth' ? (
                /* ── Mega Menu (Full Width) ── */
                <div
                    id={menuId}
                    ref={menuRef}
                    aria-label={label}
                    {...(!isOpen ? { inert: true } : {})}
                    className={`fixed left-0 w-full z-[100] transition-all duration-300 ease-out ${isOpen
                        ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                        : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                        }`}
                    style={{ top: menuTop ? `${menuTop}px` : 'var(--fc-header-height, 50px)' }}
                    onMouseEnter={handleMouseEnter}
                    onKeyDown={handleMenuKeyDown}
                >
                    <div className="container mx-auto px-6" onMouseLeave={handleMouseLeave}>
                        <div
                            className="rounded-b-lg shadow-2xl elevation-xl border-t overflow-hidden text-left mt-0"
                            style={{ backgroundColor: theme.colors.bg.card, borderTopColor: theme.colors.border }}
                        >
                            <div className={`grid ${getGridClass()} gap-4 p-8`}>
                                {items.map((item, index) => (
                                    <div key={index} className="flex flex-col">
                                        <NavLinkOrA
                                            item={item}
                                            tabIndex={isOpen ? 0 : -1}
                                            className="block px-4 py-2 text-sm font-medium rounded transition-all duration-200 interactive-effect border border-transparent"
                                            style={{ color: theme.colors.text.primary }}
                                        >
                                            {item.label}
                                        </NavLinkOrA>
                                        {item.subItems && item.subItems.length > 0 && (
                                            <div
                                                className="flex flex-col ml-4 mt-1 border-l-2 pl-2"
                                                style={{ borderColor: `${theme.colors.border || '#e5e7eb'}80` }}
                                            >
                                                {item.subItems.map((sub, i) => (
                                                    <NavLinkOrA
                                                        key={i}
                                                        item={sub}
                                            tabIndex={isOpen ? 0 : -1}
                                                        className="block px-4 py-1.5 text-xs rounded transition-all duration-200 opacity-90 interactive-effect border border-transparent"
                                                        style={{ color: theme.colors.text.primary }}
                                                    >
                                                        {sub.label}
                                                    </NavLinkOrA>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* ── Standard Dropdown (Absolute) ── */
                <div
                    id={menuId}
                    ref={menuRef}
                    aria-label={label}
                    {...(!isOpen ? { inert: true } : {})}
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 z-[100] transition-all duration-300 ease-out ${isOpen
                        ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                        : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                        }`}
                    onMouseEnter={handleMouseEnter}
                    onKeyDown={handleMenuKeyDown}
                >
                    <div
                        className="w-75 rounded-2xl shadow-2xl elevation-xl border overflow-hidden text-left"
                        style={{ backgroundColor: theme.colors.bg.card, borderColor: theme.colors.border }}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={`grid ${getGridClass()} gap-2 p-4`}>
                            {items.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <NavLinkOrA
                                        item={item}
                                            tabIndex={isOpen ? 0 : -1}
                                        className="block px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 interactive-effect border border-transparent"
                                        style={{ color: theme.colors.text.primary }}
                                    >
                                        {item.label}
                                    </NavLinkOrA>
                                    {item.subItems && item.subItems.length > 0 && (
                                        <div
                                            className="flex flex-col ml-4 mt-1 border-l-2 pl-2"
                                            style={{ borderColor: `${theme.colors.border || '#e5e7eb'}80` }}
                                        >
                                            {item.subItems.map((sub, i) => (
                                                <NavLinkOrA
                                                    key={i}
                                                    item={sub}
                                            tabIndex={isOpen ? 0 : -1}
                                                    className="block px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 opacity-80 interactive-effect border border-transparent hover:opacity-100"
                                                    style={{ color: theme.colors.text.primary }}
                                                >
                                                    {sub.label}
                                                </NavLinkOrA>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Bottom accent bar */}
                        <div className="h-1 w-full" style={{ backgroundColor: theme.colors.secondary.DEFAULT }} />
                    </div>
                </div>
            )}
        </div>
    );
};
