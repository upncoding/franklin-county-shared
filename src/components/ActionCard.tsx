import { useTheme } from '../theme/ThemeContext';

export interface ActionCardProps {
    preheader?: string;
    title: string;
    url: string;
    className?: string;
    available?: boolean;
    unavailableTooltip?: string;
}

export function ActionCard({ 
    preheader, 
    title, 
    url, 
    className = '',
    available = true,
    unavailableTooltip = "This document is currently unavailable and will be published soon."
}: ActionCardProps) {
    const { theme } = useTheme();
    const isAvailable = Boolean(available && url && url !== '#');

    if (!isAvailable) {
        return (
            <div 
                className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 relative group cursor-not-allowed opacity-75 bg-gray-50 ${className}`} 
                style={{ borderColor: theme.colors.border, color: theme.colors.text.muted }}
                tabIndex={0}
                aria-disabled="true"
                title={unavailableTooltip}
                aria-label={`${preheader ? `${preheader} ` : ''}${title} (${unavailableTooltip})`}
            >
                <div>
                    {preheader && (
                        <span className="block text-xs uppercase tracking-widest mb-1 text-gray-500 font-bold">
                            {preheader} • Unavailable
                        </span>
                    )}
                    <span className="text-xl font-bold text-gray-700">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded border border-amber-200">Coming Soon</span>
                </div>
                <span 
                    role="tooltip" 
                    className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus-within:block w-max max-w-xs px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg z-20 text-center"
                >
                    {unavailableTooltip}
                </span>
            </div>
        );
    }

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
