const fs = require('fs');

// 1. Fix Layout.tsx: add solid white background to mobile menu
let layout = fs.readFileSync('src/components/Layout.tsx', 'utf-8');
layout = layout.replace(
    /style={{ background: theme.colors.bg.sidebar }}/g,
    "style={{ backgroundColor: '#ffffff', background: theme.colors.bg.sidebar }}"
);
fs.writeFileSync('src/components/Layout.tsx', layout);

// 2. Fix test-ada.js: await resize effect
let test = fs.readFileSync('scripts/test-ada.js', 'utf-8');
test = test.replace(
    /await p.setViewport\(viewport\);/g,
    "await p.setViewport(viewport); await new Promise(r => setTimeout(r, 500));"
);
fs.writeFileSync('scripts/test-ada.js', test);

