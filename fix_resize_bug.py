import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

resize_effect = """
    // Auto-close mobile menu on desktop resize
    useEffect(() => {
        const mql = window.matchMedia('(min-width: 1280px)'); // xl breakpoint
        const handleMatch = (e: MediaQueryListEvent | MediaQueryList) => {
            if (e.matches) {
                setIsMobileMenuOpen(false);
            }
        };
        // Initial check
        handleMatch(mql);
        
        mql.addEventListener('change', handleMatch);
        return () => mql.removeEventListener('change', handleMatch);
    }, []);
"""

# Insert right after the route change effect:
# useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

content = content.replace(
    "useEffect(() => { setIsMobileMenuOpen(false); }, [location]);",
    "useEffect(() => { setIsMobileMenuOpen(false); }, [location]);\n" + resize_effect
)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
