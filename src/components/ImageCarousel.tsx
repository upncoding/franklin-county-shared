import { useState, useEffect } from 'react';

export interface ImageCarouselProps {
    images: string[];
    interval?: number;
    className?: string;
}

export function ImageCarousel({ images, interval = 5000, className = '' }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);
        
        return () => clearInterval(timer);
    }, [images, interval]);

    if (!images || images.length === 0) return null;

    return (
        <div className={`w-full h-full overflow-hidden ${className}`}>
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url('${images[currentIndex]}')` }}
            />
        </div>
    );
}
