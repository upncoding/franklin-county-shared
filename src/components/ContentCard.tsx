import type { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

export interface ContentCardProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

export function ContentCard({ title, children, className = '' }: ContentCardProps) {
    const { theme } = useTheme();
    
    return (
        <div className={`content-card hover-lift elevation-md transition-all duration-500 ${className}`}>
            {title && (
                <h2 
                    className="text-2xl font-serif font-black mb-4" 
                    style={{ color: theme.colors.text.primary }}
                >
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
}
