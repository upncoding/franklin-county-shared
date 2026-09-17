with open('src/components/PageHeader.tsx', 'r') as f:
    content = f.read()

# Fix 1: Make the overlay pointer-events-none so it doesn't block the carousel dots
content = content.replace(
    'className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-transparent"',
    'className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-transparent pointer-events-none"'
)

# Fix 2: Change min-h-screen to use CSS calc to account for the dynamic header height
content = content.replace(
    'className={`relative w-full flex items-center justify-center ${isHomePage ? \'min-h-screen\' : \'h-[60vh]\'} overflow-hidden`}',
    'className="relative w-full flex items-center justify-center overflow-hidden"\n            style={isHomePage ? { minHeight: \'calc(100vh - var(--fc-header-height, 0px))\' } : { height: \'60vh\' }}'
)

with open('src/components/PageHeader.tsx', 'w') as f:
    f.write(content)
