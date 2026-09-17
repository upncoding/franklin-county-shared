import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

# Fix Parent Title
content = content.replace(
    'className="text-2xl font-black uppercase tracking-[0.15em] mb-4 mt-6 block"',
    'className="text-sm font-black uppercase tracking-[0.2em] mb-3 mt-4 block text-center"'
)

# Fix Sub NavLink block
sub_navlink_pattern = re.compile(
    r'<NavLink\s+key=\{j\}\s+to=\{sub\.url\}\s+onClick=\{\(\) => setIsMobileMenuOpen\(false\)\}\s+className=\{\(\{ isActive \}\) =>\s+`block w-full flex justify-center items-center gap-3 text-xl font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl \$\{isActive \? \'\' : \'interactive-effect\'\}`\s+\}\s+style=\{\(\{ isActive \}\) => \(\{\s+color: isActive \? theme\.colors\.primary\.dark : theme\.colors\.text\.primary,\s+backgroundColor: isActive \? `\$\{theme\.colors\.primary\.DEFAULT\}15` : \'transparent\',\s+borderLeft: isActive \? `4px solid \$\{theme\.colors\.primary\.DEFAULT\}` : \'4px solid transparent\',\s+\}\)\}\s*>\s*\{\(\{ isActive \}\) => \(\s*<>\s*<span className=\{`transition-opacity \$\{isActive \? \'opacity-100\' : \'opacity-0\'\}`\}>→</span>\s*<span>\{sub\.label\}</span>\s*</>\s*\)\}\s*</NavLink>',
    re.MULTILINE
)

sub_navlink_replacement = """<NavLink
                                                            key={j}
                                                            to={sub.url}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block w-full text-center text-[13px] font-bold uppercase tracking-widest transition-all duration-200 py-3 px-6 rounded-xl interactive-effect"
                                                            style={({ isActive }) => ({
                                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}10` : 'transparent',
                                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                                                borderRight: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                                            })}
                                                        >
                                                            {sub.label}
                                                        </NavLink>"""

content = sub_navlink_pattern.sub(sub_navlink_replacement, content)

# Fix Plain NavLink block
plain_navlink_pattern = re.compile(
    r'<NavLink\s+key=\{i\}\s+to=\{item\.url \|\| \'/\'\}\s+onClick=\{\(\) => setIsMobileMenuOpen\(false\)\}\s+className=\{\(\{ isActive \}\) =>\s+`block w-full flex justify-center items-center gap-3 text-xl font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl \$\{isActive \? \'\' : \'interactive-effect\'\}`\s+\}\s+style=\{\(\{ isActive \}\) => \(\{\s+color: isActive \? theme\.colors\.primary\.dark : theme\.colors\.text\.primary,\s+backgroundColor: isActive \? `\$\{theme\.colors\.primary\.DEFAULT\}15` : \'transparent\',\s+borderLeft: isActive \? `4px solid \$\{theme\.colors\.primary\.DEFAULT\}` : \'4px solid transparent\',\s+\}\)\}\s*>\s*\{\(\{ isActive \}\) => \(\s*<>\s*<span className=\{`transition-opacity \$\{isActive \? \'opacity-100\' : \'opacity-0\'\}`\}>→</span>\s*<span>\{item\.label\}</span>\s*</>\s*\)\}\s*</NavLink>',
    re.MULTILINE
)

plain_navlink_replacement = """<NavLink
                                            key={i}
                                            to={item.url || '/'}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full text-center text-[13px] font-bold uppercase tracking-widest transition-all duration-200 py-3 px-6 rounded-xl interactive-effect"
                                            style={({ isActive }) => ({
                                                color: isActive ? theme.colors.primary.dark : theme.colors.text.primary,
                                                backgroundColor: isActive ? `${theme.colors.primary.DEFAULT}10` : 'transparent',
                                                borderLeft: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                                borderRight: isActive ? `4px solid ${theme.colors.primary.DEFAULT}` : '4px solid transparent',
                                            })}
                                        >
                                            {item.label}
                                        </NavLink>"""

content = plain_navlink_pattern.sub(plain_navlink_replacement, content)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
