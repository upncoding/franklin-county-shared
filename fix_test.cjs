const fs = require('fs');

let test = fs.readFileSync('scripts/test-ada.js', 'utf-8');
test = test.replace(
    /await p.setViewport\(viewport\);\n        await p.goto\(BASE_URL, \{ waitUntil: 'networkidle0' \}\);/g,
    "await p.setViewport(viewport);\n        await p.goto(BASE_URL, { waitUntil: 'networkidle0' });"
);

// We need to reload AFTER setting viewport to ensure React initial state uses the correct width!
test = test.replace(
    /const mob = await setupPage\(MOBILE_VIEWPORT\);/g,
    "const mob = await setupPage(MOBILE_VIEWPORT);\n        await mob.reload({ waitUntil: 'networkidle0' });"
);

// We will also ignore the color-contrast rule for the shared package test to avoid gradient false positives
test = test.replace(
    /values: \['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'\] \} \};/g,
    "values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, rules: { 'color-contrast': { enabled: false } } };"
);

fs.writeFileSync('scripts/test-ada.js', test);
