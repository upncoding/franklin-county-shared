import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

pattern = re.compile(
    r'<a\s+key=\{i\}\s+href=\{item\.url\}\s+target=\{item\.url\?\.startsWith\(\'http\'\) \? \'_blank\' : undefined\}\s+rel=\{item\.url\?\.startsWith\(\'http\'\) \? \'noopener noreferrer\' : undefined\}\s+className="text-xs transition-colors text-center py-1"\s+style=\{\{ color: theme\.colors\.text\.primary \}\}\s+onMouseEnter=\{\(e\) => e\.currentTarget\.style\.color = theme\.colors\.secondary\.DEFAULT\}\s+onMouseLeave=\{\(e\) => e\.currentTarget\.style\.color = theme\.colors\.text\.primary\}\s*>\s*\{item\.label\}\s*</a>',
    re.MULTILINE
)

replacement = """<a
                                                            key={i}
                                                            href={item.url}
                                                            target={item.url?.startsWith('http') ? '_blank' : undefined}
                                                            rel={item.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                            className="block w-full text-center text-xs transition-all duration-200 py-2 px-2 rounded-lg interactive-effect"
                                                            style={{ color: theme.colors.text.primary }}
                                                        >
                                                            {item.label}
                                                        </a>"""

content = pattern.sub(replacement, content)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
