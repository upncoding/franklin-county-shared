const fs = require('fs');
let code = fs.readFileSync('src/components/SmartTooltip.tsx', 'utf-8');
code = `import { useTheme } from '../theme/ThemeContext';\n` + code;
code = code.replace(
    /export const SmartTooltip = \({ triggerText, tooltipContent, isActive, onToggle }: SmartTooltipProps\) => {/g,
    "export const SmartTooltip = ({ triggerText, tooltipContent, isActive, onToggle }: SmartTooltipProps) => {\n    const { theme } = useTheme();"
);
code = code.replace(
    /className="cursor-help text-county-blue font-medium border-b-2 border-dotted border-county-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-county-gold focus-visible:ring-offset-1 rounded-sm transition-colors hover:text-county-blue-light"/g,
    `className="cursor-help font-medium border-b-2 border-dotted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded-sm transition-colors interactive-effect"`
);
fs.writeFileSync('src/components/SmartTooltip.tsx', code);
