import type { ReactNode } from 'react';
export interface ContentCardProps {
    title?: string;
    children: ReactNode;
    className?: string;
}
export declare function ContentCard({ title, children, className }: ContentCardProps): import("react").JSX.Element;
