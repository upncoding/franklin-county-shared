import { useTheme } from '../theme/ThemeContext';

export interface EventCardProps {
    date: string; // e.g. "June 15, 2026"
    title: string;
    time?: string;
    location?: string;
    actionLabel?: string;
    actionUrl?: string;
    className?: string;
}

export function EventCard({ 
    date, 
    title, 
    time, 
    location, 
    actionLabel = "Register Now", 
    actionUrl = "#",
    className = '' 
}: EventCardProps) {
    const { theme } = useTheme();

    const dateParts = date.split(' ');
    const month = dateParts[0];
    const day = dateParts.length > 1 ? dateParts[1].replace(',', '') : '';

    return (
        <div className={`content-card hover-lift elevation-md transition-all duration-500 border-l-8 ${className}`} style={{ borderLeftColor: theme.colors.secondary.DEFAULT, backgroundColor: 'white' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-6 items-center">
                    <div className="text-center min-w-[80px]">
                        <span className="block text-2xl font-black" style={{ color: theme.colors.text.primary }}>{day}</span>
                        <span className="block text-xs font-bold uppercase tracking-widest" style={{ color: theme.colors.secondary.dark }}>{month}</span>
                    </div>
                    <div className="w-px h-12 bg-black/10"></div>
                    <div>
                        <h3 className="text-xl font-bold mb-1" style={{ color: theme.colors.text.primary }}>{title}</h3>
                        {(time || location) && (
                            <p className="text-sm font-medium" style={{ color: theme.colors.text.muted }}>
                                {time} {time && location && '•'} {location}
                            </p>
                        )}
                    </div>
                </div>
                <a 
                    href={actionUrl}
                    className="inline-block text-center px-6 py-2 rounded-lg font-bold text-sm transition-all border-2" 
                    style={{ borderColor: theme.colors.secondary.DEFAULT, color: theme.colors.text.primary }} 
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.colors.secondary.DEFAULT; }} 
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                    {actionLabel}
                </a>
            </div>
        </div>
    );
}
