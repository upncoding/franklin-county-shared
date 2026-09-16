import { type ReactNode } from 'react';
import { type NavbarItem } from './Navbar';
export interface LayoutProps {
    children: ReactNode;
    /**
     * Department name — e.g. "Community Services", "Sustainability Toolkit".
     * Rendered in the Navbar brand and in the Footer title.
     * Set it once here; it flows to both automatically.
     */
    siteTitle: string;
    /** Show the county-wide utility row above the navbar. @default true */
    showTopbar?: boolean;
    /** Show the brand navbar. @default true */
    showNavbar?: boolean;
    /** Show the footer. @default true */
    showFooter?: boolean;
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
    /** @default "518-891-2280" */
    footerPhone?: string;
    /** @default "36 Church St / Saranac Lake, NY 12983 / P.O. Box 1337" */
    footerAddress?: ReactNode;
    heroImage?: string;
    heroVideo?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    /** Provide a custom theme to override the default shared theme */
    theme?: any;
}
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
export default function Layout({ theme, ...props }: LayoutProps): import("react").JSX.Element;
