import type { ReactNode, CSSProperties } from 'react';
export interface ContentCardProps {
    title?: string;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare function ContentCard({ title, children, className, style }: ContentCardProps): import("react").JSX.Element;
