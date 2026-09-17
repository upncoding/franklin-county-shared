with open('src/components/ImageCarousel.tsx', 'r') as f:
    content = f.read()

# Remove 'relative' from the base class string.
content = content.replace(
    'className={`relative w-full h-full overflow-hidden ${className}`}',
    'className={`w-full h-full overflow-hidden ${className}`}'
)

with open('src/components/ImageCarousel.tsx', 'w') as f:
    f.write(content)
