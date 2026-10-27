import { useTheme } from '../theme/ThemeContext';

export interface PDFPlaceholderProps {
    title: string;
    filename?: string;
    description?: string;
    url?: string;
    available?: boolean;
    unavailableMessage?: string;
    unavailableTooltip?: string;
}

export function PDFPlaceholder({ 
    title, 
    filename, 
    description = "This document is available for download.",
    url,
    available = true,
    unavailableMessage = "This document is currently being updated and will be available for download soon.",
    unavailableTooltip = "This file is currently unavailable and will be published soon."
}: PDFPlaceholderProps) {
    const { theme } = useTheme();

    if ((!filename && !url) || filename === '' || url === '#') {
        if (!title) return null;
    }

    const isAvailable = Boolean(available && (filename || url) && filename !== '' && url !== '#');
    const fileUrl = url || `/docs/${filename}`;

    return (
        <div className="space-y-6">
            <div className="border-l-4 p-6 rounded-r shadow-sm" style={{ borderLeftColor: theme.colors.secondary.DEFAULT, background: theme.colors.bg.card }}>
                {!isAvailable && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 mb-3">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Document Currently Unavailable</span>
                    </div>
                )}
                <h2 className="text-xl font-bold mb-2" style={{ color: theme.colors.text.primary }}>{title}</h2>
                <p className="mb-6 text-sm italic" style={{ color: theme.colors.text.muted }}>
                    {isAvailable ? description : unavailableMessage}
                </p>

                <div className="flex flex-col gap-4 p-4 border rounded max-w-md fluid-container" style={{ background: theme.colors.bg.cardAlt, borderColor: theme.colors.border }}>
                    <div className="flex items-center gap-4 w-full min-w-0">
                        <div 
                            className="p-3 rounded-lg shrink-0" 
                            style={{ 
                                backgroundColor: isAvailable ? `${theme.colors.secondary.DEFAULT}33` : `${theme.colors.secondary.DEFAULT}15`, 
                                color: isAvailable ? theme.colors.secondary.DEFAULT : theme.colors.text.muted 
                            }}
                        >
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
                                {filename || title}
                            </div>
                            <div className="text-xs mt-1 font-medium" style={{ color: isAvailable ? theme.colors.text.muted : '#92400e' }}>
                                {isAvailable ? "PDF Document" : "PDF Document • Pending Publication"}
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {isAvailable ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <div className="relative group">
                                    <button 
                                        type="button"
                                        aria-disabled="true"
                                        tabIndex={0}
                                        onClick={(e) => e.preventDefault()}
                                        className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-bold rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" 
                                        title={unavailableTooltip}
                                        aria-label={`Preview ${title} (${unavailableTooltip})`}
                                    >
                                        Preview
                                    </button>
                                    <span 
                                        role="tooltip" 
                                        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus-within:block w-max max-w-xs px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg z-20 text-center"
                                    >
                                        {unavailableTooltip}
                                    </span>
                                </div>
                                <div className="relative group">
                                    <button 
                                        type="button"
                                        aria-disabled="true"
                                        tabIndex={0}
                                        onClick={(e) => e.preventDefault()}
                                        className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-bold rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" 
                                        title={unavailableTooltip}
                                        aria-label={`Download ${title} (${unavailableTooltip})`}
                                    >
                                        Download
                                    </button>
                                    <span 
                                        role="tooltip" 
                                        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus-within:block w-max max-w-xs px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg z-20 text-center"
                                    >
                                        {unavailableTooltip}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
