import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

# Remove the hero properties from LayoutProps interface
content = re.sub(r'// ── Hero section \(all optional\) ──\s*heroTitle\?: string;\s*heroImage\?: string;\s*heroVideo\?: string;\s*heroSubtitle\?: string;\s*', '', content)

# Remove the destructuring of hero variables in Layout function
content = re.sub(r'heroTitle,\s*heroImage,\s*heroVideo,\s*heroSubtitle,\s*', '', content)

# Remove the actual Hero JSX block inside <main>
hero_block = re.search(r'\{\/\* Hero section \*\/\}.*?\{\/\* Page content \*\/\}', content, re.DOTALL)
if hero_block:
    content = content.replace(hero_block.group(0), '{/* Page content */}')

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
