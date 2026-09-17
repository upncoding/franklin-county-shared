import { useTheme } from '../theme/ThemeContext';

export interface ResourceCardProps {
    name: string;
    description: string;
    categories?: string[];
    address?: string;
    hours?: string;
    website?: string;
    email?: string;
    phone?: string;
    className?: string;
}

export function ResourceCard({ 
    name, 
    description, 
    categories = [], 
    address, 
    hours, 
    website, 
    email, 
    phone, 
    className = '' 
}: ResourceCardProps) {
    const { theme } = useTheme();

    return (
        <div className={`content-card hover-lift elevation-md transition-all duration-500 ${className}`} style={{ backgroundColor: 'white' }}>
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                    {categories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            {categories.map((cat, idx) => (
                                <span 
                                    key={idx} 
                                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full" 
                                    style={{ backgroundColor: theme.colors.bg.mainTo, color: theme.colors.text.primary }}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <h3 className="text-xl font-bold mb-1" style={{ color: theme.colors.text.primary }}>{name}</h3>
                    <p className="text-sm" style={{ color: theme.colors.text.muted }}>{description}</p>
                    
                    <div className="flex flex-col gap-2 mt-4">
                        {address && (
                            <a 
                                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-start text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" 
                                style={{ color: theme.colors.text.primary }}
                                aria-label={`Open address in Google Maps: ${address}`}
                            >
                                <span className="mr-1.5" aria-hidden="true">📍</span>
                                <span className="text-left leading-tight">{address}</span>
                            </a>
                        )}

                        {hours && (
                            <p className="inline-flex items-start text-sm font-medium" style={{ color: theme.colors.text.primary }}>
                                <span className="mr-1.5" aria-hidden="true">🕒</span>
                                <span className="text-left leading-tight">{hours}</span>
                            </p>
                        )}

                        {website && (
                            <a 
                                href={website.startsWith('http') ? website : `https://${website}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                style={{ color: theme.colors.secondary.dark }}
                                aria-label={`Visit website for ${name} (opens in new tab)`}
                            >
                                <span className="mr-1.5" aria-hidden="true">🌐</span>
                                <span className="text-left leading-tight truncate max-w-[250px] sm:max-w-xs">{website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                            </a>
                        )}

                        {email && (
                            <a 
                                href={`mailto:${email}`}
                                className="inline-flex items-center text-sm font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 break-all"
                                style={{ color: theme.colors.secondary.dark }}
                                aria-label={`Email ${name} at ${email}`}
                            >
                                <span className="mr-1.5" aria-hidden="true">✉️</span>
                                <span className="text-left leading-tight">{email}</span>
                            </a>
                        )}
                    </div>
                </div>
                
                {phone && (
                    <a
                        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                        className="px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 self-start md:self-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{ backgroundColor: theme.colors.secondary.DEFAULT, color: theme.colors.text.primary }}
                        onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                        aria-label={`Call ${name} at ${phone}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {phone}
                    </a>
                )}
            </div>
        </div>
    );
}
