import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

# For sub.label
# from:
# >
#    <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>→</span>
#    <span>{sub.label}</span>
# </NavLink>
# to:
# >
#    {({ isActive }) => (
#       <>
#           <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>→</span>
#           <span>{sub.label}</span>
#       </>
#    )}
# </NavLink>

content = re.sub(
    r'>\n\s*<span className=\{`transition-opacity \$\{isActive \? \'opacity-100\' : \'opacity-0\'\}`\}>→</span>\n\s*<span>\{sub\.label\}</span>\n\s*</NavLink>',
    '>\n                                                            {({ isActive }) => (\n                                                                <>\n                                                                    <span className={`transition-opacity ${isActive ? \'opacity-100\' : \'opacity-0\'}`}>→</span>\n                                                                    <span>{sub.label}</span>\n                                                                </>\n                                                            )}\n                                                        </NavLink>',
    content
)

content = re.sub(
    r'>\n\s*<span className=\{`transition-opacity \$\{isActive \? \'opacity-100\' : \'opacity-0\'\}`\}>→</span>\n\s*<span>\{item\.label\}</span>\n\s*</NavLink>',
    '>\n                                            {({ isActive }) => (\n                                                <>\n                                                    <span className={`transition-opacity ${isActive ? \'opacity-100\' : \'opacity-0\'}`}>→</span>\n                                                    <span>{item.label}</span>\n                                                </>\n                                            )}\n                                        </NavLink>',
    content
)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
