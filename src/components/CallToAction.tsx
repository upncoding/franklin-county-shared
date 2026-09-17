import { useTheme } from '../theme/ThemeContext';

export interface CallToActionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    className?: string;
}

export function CallToAction({ title, description, buttonText, buttonUrl, className = '' }: CallToActionProps) {
    const { theme } = useTheme();

    return (
        <section className={`content-card text-center py-12 ${className}`} style={{ backgroundColor: theme.colors.primary.dark, color: '#ffffff' }}>
            <h2 className="text-3xl font-serif font-black mb-4">{title}</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                {description}
            </p>
            <a 
                href={buttonUrl} 
                className="inline-block px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all hover:scale-105" 
                style={{ backgroundColor: theme.colors.secondary.DEFAULT, color: theme.colors.primary.dark }}
            >
                {buttonText}
            </a>
        </section>
    );
}
