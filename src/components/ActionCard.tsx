import { useTheme } from '../theme/ThemeContext';

export interface ActionCardProps {
    preheader?: string;
    title: string;
    url: string;
    className?: string;
}

export function ActionCard({ preheader, title, url, className = '' }: ActionCardProps) {
    const { theme } = useTheme();

    return (
        <a 
            href={url} 
            className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 group ${className}`} 
            style={{ borderColor: theme.colors.secondary.DEFAULT, color: theme.colors.text.primary, backgroundColor: 'white' }}
        >
            <div>
                {preheader && (
                    <span className="block text-xs uppercase tracking-widest mb-1" style={{ color: theme.colors.secondary.dark }}>
                        {preheader}
                    </span>
                )}
                <span className="text-xl font-bold">{title}</span>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform" style={{ color: theme.colors.secondary.dark }}>→</span>
        </a>
    );
}
