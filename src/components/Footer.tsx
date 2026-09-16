import type { ReactNode } from 'react';
import seal from '../assets/seal.png';
import { useTheme } from '../theme/ThemeContext';
import { getNativeMapUrl } from '../utils/mapUtils';

// ─── Types ───────────────────────────────────────────

export interface FooterProps {
    /**
     * Department name — matches Navbar siteTitle.
     * Displayed as "Franklin County / [siteTitle]" above the seal.
     * Populated automatically from Layout; no need to set manually.
     */
    siteTitle: string;
    /**
     * Contact phone number.
     * @default "518-891-2280"
     */
    phone?: string;
    /**
     * County office address block. Accepts a ReactNode for multi-line addresses.
     * @default "36 Church St / Saranac Lake, NY 12983 / P.O. Box 1337"
     */
    address?: ReactNode;
}

// ─── Defaults ────────────────────────────────────────

const DEFAULT_PHONE = '518-891-2280';
const DEFAULT_ADDRESS_STRING = '36 Church St Saranac Lake NY 12983';
const DEFAULT_ADDRESS: ReactNode = (
    <>
        36 Church St<br />
        Saranac Lake, NY 12983<br />
        P.O. Box 1337
    </>
);

// ─── Footer ──────────────────────────────────────────

/**
 * Footer — Static county footer with configurable contact info.
 *
 * Static (never changes): Franklin County seal, "Franklin County / [siteTitle]",
 * © {year} Franklin County, NY copyright.
 *
 * Configurable (with defaults): phone, address.
 * All three are set once on <Layout> and flow here automatically.
 */
export const Footer = ({
    phone = DEFAULT_PHONE,
    address = DEFAULT_ADDRESS,
}: FooterProps) => {
    const { theme } = useTheme();

    // Use the string version of address for the map link when address is the default
    const mapAddress = phone === DEFAULT_PHONE ? DEFAULT_ADDRESS_STRING : undefined;

    return (
        <footer
            aria-label="Site footer"
            className="pt-12 pb-8 border-t-8"
            style={{
                backgroundColor: theme.colors.bg.footer,
                borderTopColor: theme.colors.secondary.DEFAULT,
                color: theme.colors.text.onDark,
            }}
        >
            <div className="container mx-auto px-6">
                {/* Main Footer Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-8 items-start">

                    {/* ── Contact ── */}
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-4 rounded-full" aria-hidden="true">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                                style={{ color: theme.colors.secondary.DEFAULT }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: theme.colors.text.onDark }}>
                                Contact Us
                            </div>
                            <a
                                href={`tel:${phone.replace(/\D/g, '')}`}
                                className="text-lg font-semibold transition-colors"
                                style={{ color: theme.colors.text.onDark }}
                                onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.secondary.DEFAULT}
                                onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text.onDark}
                                aria-label={`Call ${phone}`}
                            >
                                {phone}
                            </a>
                        </div>
                    </div>

                    {/* ── Address ── */}
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-4 rounded-full" aria-hidden="true">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                                style={{ color: theme.colors.secondary.DEFAULT }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: theme.colors.text.onDark }}>
                                County Office
                            </div>
                            {mapAddress ? (
                                <a
                                    href={getNativeMapUrl(mapAddress)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium leading-snug transition-colors cursor-pointer block"
                                    style={{ color: theme.colors.text.onDark }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.secondary.DEFAULT}
                                    onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text.onDark}
                                    aria-label="Open office address in maps"
                                >
                                    {address}
                                </a>
                            ) : (
                                <address className="text-sm font-medium leading-snug not-italic" style={{ color: theme.colors.text.onDark }}>
                                    {address}
                                </address>
                            )}
                        </div>
                    </div>

                    {/* ── Seal & Title ── */}
                    <div className="flex items-center gap-4 md:justify-end">
                        <div>
                            <a
                                href="/"
                                className="text-sm font-medium transition-colors block mb-2"
                                style={{ color: theme.colors.text.onDark }}
                                onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.secondary.DEFAULT}
                                onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text.onDark}
                            >
                                Franklin County<br />Community Services
                            </a>
                        </div>
                        <img
                            src={seal}
                            alt="Franklin County Seal"
                            className="h-20 w-20 opacity-90"
                        />
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-6 border-t border-white/10 text-center">
                    <p className="text-xs" style={{ color: theme.colors.text.onDark }}>
                        &copy; {new Date().getFullYear()} Franklin County, NY
                    </p>
                </div>
            </div>
        </footer>
    );
};
