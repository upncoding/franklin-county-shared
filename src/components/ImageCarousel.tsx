import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${images[currentIndex]}')` }}
                />
            </AnimatePresence>
        </div>
    );
}
