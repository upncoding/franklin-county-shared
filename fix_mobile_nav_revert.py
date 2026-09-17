import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

# Replace Parent title
content = content.replace(
    'className="text-2xl font-black uppercase tracking-[0.15em] mb-4 mt-6 block"',
    'className="text-sm font-black uppercase tracking-[0.2em] mb-3 mt-4 block text-center"'
)

# Replace Subitem/NavLink className
# Remove arrow render prop logic
# From:
# {({ isActive }) => (
#     <>
#         <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>→</span>
#         <span>{sub.label}</span>
#     </>
# )}
# To:
# {sub.label}

content = re.sub(
    r'\{\(\{ isActive \}\) => \(\s*<>\s*<span className=\{`transition-opacity \$\{isActive \? \'opacity-100\' : \'opacity-0\'\}`\}>→</span>\s*<span>\{(sub\.label|item\.label)\}</span>\s*</>\s*\)\}',
    r'{\1}',
    content
)

# NavLink className:
content = content.replace(
    "`block w-full flex justify-center items-center gap-3 text-xl font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl ${isActive ? '' : 'interactive-effect'}`",
    "`block w-full text-center text-sm font-bold uppercase tracking-wider transition-all duration-200 py-3 px-6 rounded-xl interactive-effect`"
)

# NavLink Style:
old_style_sub = """                                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}15` : 'transparent',
                                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',"""

new_style_sub = """                                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}10` : 'transparent',
                                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                                                borderRight: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',"""
content = content.replace(old_style_sub, new_style_sub)

old_style_item = """                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}15` : 'transparent',
                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',"""

content = content.replace(old_style_item, new_style_sub)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
