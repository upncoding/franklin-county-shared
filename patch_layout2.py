import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

old_use_effect = """    // Measure header height and expose as CSS variable so consuming apps can use it
    useEffect(() => {
        if (!headerRef.current || !layoutRef.current) return;
        let lastWidth = window.innerWidth;
        let currentMax = 0;
        
        const update = () => {
            if (!headerRef.current) return;
            const h = headerRef.current.offsetHeight;
            const w = window.innerWidth;
            
            if (w !== lastWidth) {
                lastWidth = w;
                currentMax = h;
            } else if (h > currentMax) {
                currentMax = h;
            }
            
            setHeaderHeight(prev => {
                const next = Math.max(currentMax, h);
                if (prev !== next) {
                    layoutRef.current?.style.setProperty('--fc-header-height', `${next}px`);
                    return next;
                }
                return prev;
            });
        };
        
        update();
        const ro = new ResizeObserver(update);
        ro.observe(headerRef.current);
        return () => ro.disconnect();
    }, [showTopbar]);"""

new_use_effect = """    // Measure header height and expose as CSS variable so consuming apps can use it
    useEffect(() => {
        if (!headerRef.current || !layoutRef.current) return;
        
        let lastWidth = window.innerWidth;
        let maxObserved = 0;
        let timeoutId: any;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (!headerRef.current) return;
                const h = headerRef.current.offsetHeight;
                const w = window.innerWidth;
                
                // If width changes (e.g., orientation change), reset max height
                if (w !== lastWidth) {
                    lastWidth = w;
                    maxObserved = h;
                } else {
                    maxObserved = Math.max(maxObserved, h);
                }

                setHeaderHeight(prev => {
                    const next = maxObserved;
                    if (prev !== next) {
                        layoutRef.current?.style.setProperty('--fc-header-height', `${next}px`);
                        return next;
                    }
                    return prev;
                });
            }, 100);
        };
        
        // Initial measurement
        handleResize();
        
        // Use ResizeObserver but heavily debounced to prevent React from re-rendering
        // 60 times a second during CSS transitions.
        const ro = new ResizeObserver(handleResize);
        ro.observe(headerRef.current);
        
        return () => {
            ro.disconnect();
            clearTimeout(timeoutId);
        };
    }, []);"""

content = content.replace(old_use_effect, new_use_effect)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)

