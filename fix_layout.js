const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');
code = code.replace(
`            {showNavbar && (
                <header
                    ref={headerRef}
                    className={\`fixed top-0 inset-x-0 z-50 transition-all duration-300 shadow-md \${isScrolled ? 'backdrop-blur-md' : ''}\`}
                    style={{
                        backgroundColor: theme.colors.primary.DEFAULT,
                        background: isScrolled
                            ? \`color-mix(in srgb, \${theme.colors.bg.header} 95%, transparent)\`
                            : theme.colors.bg.header,
                    }}
                >
                    {showTopbar && <Topbar />}
                    <div className="container mx-auto px-6">`,
`            {/* ── STICKY HEADER ── */}
            {showNavbar && (
                <header
                    ref={headerRef}
                    role="banner"
                    className={\`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out \${isScrolled ? 'py-2 shadow-2xl' : 'py-4 text-shadow'}\`}
                    style={{ 
                        backgroundColor: theme.colors.primary.DEFAULT,
                        background: theme.colors.bg.header 
                    }}
                >
                    <div className="container mx-auto px-6">
                        {/* Topbar row */}
                        {showTopbar && <Topbar />}`
);
fs.writeFileSync('src/components/Layout.tsx', code);
