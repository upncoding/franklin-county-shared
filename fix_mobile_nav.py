import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

# Replace the parent title span:
# from: className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 block"
# to: className="text-xl font-black uppercase tracking-[0.15em] mb-4 block"
content = content.replace(
    'className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 block"',
    'className="text-2xl font-black uppercase tracking-[0.15em] mb-4 mt-6 block"'
)

# For the NavLink className, we remove `md:text-sm` and make it `text-xl`
# from: `block w-full text-center text-2xl md:text-sm font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl ${isActive ? '' : 'interactive-effect'}`
# to: `block w-full flex justify-center items-center gap-2 text-xl font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl ${isActive ? 'font-medium' : 'interactive-effect'}`

content = content.replace(
    "`block w-full text-center text-2xl md:text-sm font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl ${isActive ? '' : 'interactive-effect'}`",
    "`block w-full flex justify-center items-center gap-3 text-xl font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl ${isActive ? '' : 'interactive-effect'}`"
)

# Replace the style for NavLink:
# from:
# color: isActive ? theme.colors.secondary.DEFAULT : theme.colors.text.primary,
# backgroundColor: isActive ? `${theme.colors.secondary.DEFAULT}10` : 'transparent',
# to:
# color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
# backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}15` : 'transparent',
# borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',

old_style = """                                                                color: isActive ? theme.colors.secondary.DEFAULT : theme.colors.text.primary,
                                                                backgroundColor: isActive ? `${theme.colors.secondary.DEFAULT}10` : 'transparent',"""

new_style = """                                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}15` : 'transparent',
                                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',"""
content = content.replace(old_style, new_style)

# We also need to do it for the plain nav link (which has the exact same code)
old_style_plain = """                                                color: isActive ? theme.colors.secondary.DEFAULT : theme.colors.text.primary,
                                                backgroundColor: isActive ? `${theme.colors.secondary.DEFAULT}10` : 'transparent',"""

new_style_plain = """                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}15` : 'transparent',
                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',"""
content = content.replace(old_style_plain, new_style_plain)

# Add the arrow inside the NavLink
# We need to change {sub.label} to:
# <>
#    <span className={`transition-opacity ${isActive ? 'opacity-100' : 'hidden'}`}>→</span>
#    <span>{sub.label}</span>
# </>

content = re.sub(r'>\s*\{sub\.label\}\s*</NavLink>', '>\n                                                            <span className={`transition-opacity ${isActive ? \'opacity-100\' : \'hidden\'}`}>→</span>\n                                                            <span>{sub.label}</span>\n                                                        </NavLink>', content)

content = re.sub(r'>\s*\{item\.label\}\s*</NavLink>', '>\n                                            <span className={`transition-opacity ${isActive ? \'opacity-100\' : \'hidden\'}`}>→</span>\n                                            <span>{item.label}</span>\n                                        </NavLink>', content)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
