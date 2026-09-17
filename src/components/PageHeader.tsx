import { useTheme } from '../theme/ThemeContext';
import { ImageCarousel } from './ImageCarousel';

export interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    image?: string;
    images?: string[];
    video?: string;
    /** If true, the header takes up min-h-screen. Otherwise h-[60vh] */
    isHomePage?: boolean;
}

export function PageHeader({ title, subtitle, image, images, video, isHomePage = false }: PageHeaderProps) {
    const { theme } = useTheme();

    if (!title && !image && (!images || images.length === 0) && !video) {
        return null;
    }

    return (
        <div className="relative w-full flex items-center justify-center overflow-hidden"
            style={isHomePage ? { minHeight: 'calc(100vh - var(--fc-header-height, 0px))' } : { height: '60vh' }}>
            {/* Video background */}
            {video && (
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src={video} type="video/mp4" />
                </video>
            )}
            {/* Carousel background */}
            {!video && images && images.length > 0 && (
                <ImageCarousel images={images} className="absolute inset-0 scale-105" />
            )}
            {/* Single Image background */}
            {!video && !images && image && (
                <div
                    className="absolute inset-0 bg-cover bg-center parallax-bg scale-105"
                    style={{ backgroundImage: `url('${image}')` }}
                />
            )}
            {/* Default fallback */}
            {!video && !image && (!images || images.length === 0) && (
                <div className="absolute inset-0" style={{ background: theme.colors.bg.main }} />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-transparent pointer-events-none" />
            
            {/* Hero text */}
            {title && (
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1
                        className="inline-block font-serif font-black leading-tight mb-8 px-4 sm:px-8 py-4 rounded-2xl shadow-lg text-shadow-lg mx-auto animate-fade-in-up"
                        style={{
                            color: '#ffffff',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            fontSize: 'clamp(1.75rem, 8vw, 4.5rem)',
                            width: 'fit-content'
                        }}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            className="max-w-3xl mx-auto leading-relaxed font-light inline-block px-6 py-4 rounded-xl shadow-lg animate-fade-in-up delay-100"
                            style={{
                                color: '#ffffff',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
