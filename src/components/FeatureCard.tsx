import { useTheme } from '../theme/ThemeContext';

export interface FeatureCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function FeatureCard({ title, children, className = '' }: FeatureCardProps) {
    const { theme } = useTheme();

    return (
        <div className={`p-6 rounded-xl bg-white shadow-sm border border-black/5 ${className}`}>
            <h3 className="font-bold mb-2" style={{ color: theme.colors.secondary.dark }}>{title}</h3>
            <div className="text-sm leading-relaxed" style={{ color: theme.colors.text.muted }}>
                {children}
            </div>
        </div>
    );
}
