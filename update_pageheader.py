import re

with open('src/components/PageHeader.tsx', 'r') as f:
    content = f.read()

# Update imports to include ImageCarousel
content = content.replace(
    "import { useTheme } from '../theme/ThemeContext';",
    "import { useTheme } from '../theme/ThemeContext';\nimport { ImageCarousel } from './ImageCarousel';"
)

# Update props
content = content.replace(
    "    image?: string;",
    "    image?: string;\n    images?: string[];"
)

# Update component signature
content = content.replace(
    "export function PageHeader({ title, subtitle, image, video, isHomePage = false }: PageHeaderProps) {",
    "export function PageHeader({ title, subtitle, image, images, video, isHomePage = false }: PageHeaderProps) {"
)

# Update rendering logic
old_image_logic = """            {/* Image background */}
            {!video && image && (
                <div
                    className="absolute inset-0 bg-cover bg-center parallax-bg scale-105"
                    style={{ backgroundImage: `url('${image}')` }}
                />
            )}"""

new_image_logic = """            {/* Carousel background */}
            {!video && images && images.length > 0 && (
                <ImageCarousel images={images} className="absolute inset-0 scale-105" />
            )}
            {/* Single Image background */}
            {!video && !images && image && (
                <div
                    className="absolute inset-0 bg-cover bg-center parallax-bg scale-105"
                    style={{ backgroundImage: `url('${image}')` }}
                />
            )}"""

content = content.replace(old_image_logic, new_image_logic)

# Make sure default fallback handles images
content = content.replace(
    "{!video && !image && (",
    "{!video && !image && (!images || images.length === 0) && ("
)
# Also fix early return if all are empty
content = content.replace(
    "if (!title && !image && !video) {",
    "if (!title && !image && (!images || images.length === 0) && !video) {"
)

with open('src/components/PageHeader.tsx', 'w') as f:
    f.write(content)
