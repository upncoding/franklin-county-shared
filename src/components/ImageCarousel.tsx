import { useState, useEffect } from 'react';

export interface ImageCarouselProps {
    images: string[];
    interval?: number;
    className?: string;
}

export function ImageCarousel({ images, interval = 5000, className = '' }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance the carousel. 
    // Adding currentIndex to the dependency array ensures that if a user manually clicks a dot, 
    // the timer resets so it doesn't immediately skip to the next image.
    useEffect(() => {
        if (!images || images.length <= 1) return;
        
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);
        
        return () => clearInterval(timer);
    }, [images, interval, currentIndex]);

    if (!images || images.length === 0) return null;

    return (
        <div className={`w-full h-full overflow-hidden ${className}`}>
            {/* Images */}
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                    style={{ 
                        backgroundImage: `url('${img}')`,
                        opacity: idx === currentIndex ? 1 : 0,
                        zIndex: idx === currentIndex ? 10 : 0
                    }}
                    aria-hidden={idx !== currentIndex}
                />
            ))}

            {/* Navigation Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`cursor-pointer h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 ${
                                idx === currentIndex 
                                    ? 'w-8 bg-white' 
                                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-current={idx === currentIndex ? 'true' : 'false'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
