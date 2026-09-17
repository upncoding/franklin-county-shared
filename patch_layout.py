import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

old_use_effect = """    // Measure header height and expose as CSS variable so consuming apps can use it
    useEffect(() => {
        if (!headerRef.current || !layoutRef.current) return;
        const update = () => {
            const h = headerRef.current!.offsetHeight;
            setHeaderHeight(h);
            layoutRef.current!.style.setProperty('--fc-header-height', `${h}px`);
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(headerRef.current);
        return () => ro.disconnect();
    }, [showTopbar, isScrolled]);"""

new_use_effect = """    // Measure header height and expose as CSS variable so consuming apps can use it
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

content = content.replace(old_use_effect, new_use_effect)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)

