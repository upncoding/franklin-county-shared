import re

with open('src/components/Sidebar.tsx', 'r') as f:
    content = f.read()

# 1. Add isOpen?: boolean; to SidebarProps
content = content.replace('title?: string;', 'title?: string;\n    isOpen?: boolean;')

# 2. Extract isOpen in destructuring
content = content.replace('title,\n}: SidebarProps', 'title,\n    isOpen,\n}: SidebarProps')

# 3. Compute resolvedIsOpen
content = content.replace('const nodeRefs = useRef<{ [key: string | number]: HTMLLIElement | null }>({});', 
"""const nodeRefs = useRef<{ [key: string | number]: HTMLLIElement | null }>({});
    const resolvedIsOpen = isOpen !== undefined ? isOpen : (isDesktop ? true : isMobileMenuOpen);""")

# 4. Use resolvedIsOpen in animate
old_animate = """animate={{
                    x: isDesktop ? 0 : (isMobileMenuOpen ? 0 : -320),
                    visibility: isDesktop ? "visible" : (isMobileMenuOpen ? "visible" : "hidden"),
                }}"""
new_animate = """animate={{
                    x: resolvedIsOpen ? 0 : -320,
                    visibility: resolvedIsOpen ? "visible" : "hidden",
                }}"""
content = content.replace(old_animate, new_animate)

# 5. Overlay logic (no change needed for now, only shows on mobile, but let's use resolvedIsOpen for consistency)
content = content.replace('{isMobileMenuOpen && !isDesktop && (', '{!isDesktop && resolvedIsOpen && (')

# 6. Change xl:sticky to lg:sticky and xl:shadow-none to lg:shadow-none
content = content.replace('xl:shadow-none xl:sticky', 'lg:shadow-none lg:sticky')

# 7. Remove !isDesktop constraint from Close button rendering so it can be closed on desktop
content = content.replace('{!isDesktop && isMobileMenuOpen && (', '{resolvedIsOpen && (')

with open('src/components/Sidebar.tsx', 'w') as f:
    f.write(content)

