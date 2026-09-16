import type { NavItem } from '../data/countyNavItems';
export interface NavDropdownProps {
    label: string;
    url?: string;
    items: NavItem[];
    columns?: number;
    textColor?: string;
    variant?: 'standard' | 'fullWidth';
}
export declare const NavDropdown: ({ label, url, items, columns, textColor, variant, }: NavDropdownProps) => import("react").JSX.Element;
