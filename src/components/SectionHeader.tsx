import { useTheme } from '../theme/ThemeContext';

export interface SectionHeaderProps {
    title: string;
    className?: string;
}

export function SectionHeader({ title, className = '' }: SectionHeaderProps) {
    const { theme } = useTheme();

    return (
        <div className={`flex items-center justify-between mb-8 ${className}`}>
            <h2 className="text-3xl font-serif font-black" style={{ color: theme.colors.text.primary }}>
                {title}
            </h2>
            <div className="h-1 flex-1 mx-8 bg-black/5 rounded-full"></div>
        </div>
    );
}
