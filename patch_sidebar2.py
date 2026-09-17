import re

with open('src/components/Sidebar.tsx', 'r') as f:
    content = f.read()

# 1. Change xl:sticky to lg:sticky, xl:shadow-none to lg:shadow-none
content = content.replace('xl:shadow-none xl:sticky', 'lg:shadow-none lg:sticky')

# 2. Remove !isDesktop from the close button condition
old_close_btn = "{!isDesktop && isMobileMenuOpen && ("
new_close_btn = "{(isMobileMenuOpen || isDesktop) && ("
content = content.replace(old_close_btn, new_close_btn)

# 3. Actually, wait. If we just allow it to close, we need to respect a close action.
# But right now, `animate={{ x: isDesktop ? 0 : (isMobileMenuOpen ? 0 : -320) }}` forces it open on desktop.
# We need to change that so it can be closed!

