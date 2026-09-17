import { useTheme } from '../theme/ThemeContext';

export interface PDFPlaceholderProps {
    title: string;
    filename: string;
    description?: string;
    url?: string;
}

export function PDFPlaceholder({ 
    title, 
    filename, 
    description = "This document is available for download.",
    url
}: PDFPlaceholderProps) {
    const { theme } = useTheme();
    const fileUrl = url || `/docs/${filename}`;

    return (
        <div className="space-y-6">
            <div className="border-l-4 p-6 rounded-r shadow-sm" style={{ borderLeftColor: theme.colors.secondary.DEFAULT, background: theme.colors.bg.card }}>
                <h2 className="text-xl font-bold mb-2" style={{ color: theme.colors.text.primary }}>{title}</h2>
                <p className="mb-6 text-sm italic" style={{ color: theme.colors.text.muted }}>
                    {description}
                </p>

                <div className="flex flex-col gap-4 p-4 border rounded max-w-md fluid-container" style={{ background: theme.colors.bg.cardAlt, borderColor: theme.colors.border }}>
                    <div className="flex items-center gap-4 w-full min-w-0">
                        <div className="p-3 rounded-lg shrink-0" style={{ backgroundColor: `${theme.colors.secondary.DEFAULT}33`, color: theme.colors.secondary.DEFAULT }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div 
                                className="font-bold whitespace-nowrap overflow-hidden text-ellipsis" 
                                style={{ 
                                    color: theme.colors.text.primary,
                                    fontSize: 'clamp(0.75rem, 4.1cqw, 1.125rem)'
                                }} 
                                title={filename}
                            >
                                {filename}
                            </div>
                            <div className="text-xs mt-1 font-medium" style={{ color: theme.colors.text.muted }}>PDF Document</div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <a 
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-bold rounded-lg transition-all border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" 
                            style={{ 
                                borderColor: theme.colors.secondary.DEFAULT,
                                color: theme.colors.text.primary,
                                backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${theme.colors.secondary.DEFAULT}10`}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            aria-label={`Preview ${title} in a new tab`}
                        >
                            Preview
                        </a>
                        <a 
                            href={fileUrl}
                            download
                            className="w-full flex items-center justify-center px-4 py-2.5 text-black text-sm font-bold rounded-lg transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" 
                            style={{ backgroundColor: theme.colors.secondary.DEFAULT }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                            aria-label={`Download ${title}`}
                        >
                            Download
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
