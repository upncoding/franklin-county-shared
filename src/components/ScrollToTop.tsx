import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const frameCountRef = useRef(0);
    
    useLayoutEffect(() => {
        // 1. Disable browser's default scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // 2. Temporarily disable smooth scrolling
        const originalHtmlScroll = document.documentElement.style.scrollBehavior;
        const orginalBodyScroll = document.body.style.scrollBehavior;

        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.scrollBehavior = 'auto';

        // 3. Reset frame count
        frameCountRef.current = 0;

        // 4. Force scroll to top using Interval (more robust than RAF for long loads)
        // Run for 1 second to ensure we beat any browser restoration or hydration shifts
        const intervalId = setInterval(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 10);

        // Clear after 1000ms
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            // Restoration after loop
            document.documentElement.style.scrollBehavior = originalHtmlScroll;
            document.body.style.scrollBehavior = orginalBodyScroll;
        }, 1000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            document.documentElement.style.scrollBehavior = originalHtmlScroll;
            document.body.style.scrollBehavior = orginalBodyScroll;
        };
    }, [pathname]);

    return null;
}
