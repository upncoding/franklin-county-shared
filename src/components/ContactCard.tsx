import { useTheme } from '../theme/ThemeContext';

export interface ContactCardProps {
    title: string;
    number: string;
    description: string;
    href?: string;
    className?: string;
}

export function ContactCard({ title, number, description, href, className = '' }: ContactCardProps) {
    const { theme } = useTheme();

    return (
        <div className={`content-card text-center hover-lift elevation-md transition-all duration-500 border-b-4 ${className}`} style={{ borderBottomColor: theme.colors.secondary.DEFAULT, backgroundColor: 'white' }}>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: theme.colors.secondary.dark }}>
                {title}
            </h3>
            {href ? (
                <a 
                    href={href}
                    className="text-2xl font-black mb-2 block hover:underline decoration-4 underline-offset-4 transition-all" 
                    style={{ color: theme.colors.text.primary, textDecorationColor: theme.colors.secondary.DEFAULT }}
                >
                    {number}
                </a>
            ) : (
                <span 
                    className="text-2xl font-black mb-2 block" 
                    style={{ color: theme.colors.text.primary }}
                >
                    {number}
                </span>
            )}
            <p className="text-sm" style={{ color: theme.colors.text.muted }}>
                {description}
            </p>
        </div>
    );
}
