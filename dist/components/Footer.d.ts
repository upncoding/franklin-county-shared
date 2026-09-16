import type { ReactNode } from 'react';
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
/**
 * Footer — Static county footer with configurable contact info.
 *
 * Static (never changes): Franklin County seal, "Franklin County / [siteTitle]",
 * © {year} Franklin County, NY copyright.
 *
 * Configurable (with defaults): phone, address.
 * All three are set once on <Layout> and flow here automatically.
 */
export declare const Footer: ({ phone, address, }: FooterProps) => import("react").JSX.Element;
