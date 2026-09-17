with open('src/index.ts', 'r') as f:
    content = f.read()

exports_to_add = """
export * from './components/Badge';
export * from './components/FeatureCard';
export * from './components/ActionCard';
export * from './components/EventCard';
export * from './components/CallToAction';
"""

if "export * from './components/Badge'" not in content:
    content += exports_to_add

with open('src/index.ts', 'w') as f:
    f.write(content)
