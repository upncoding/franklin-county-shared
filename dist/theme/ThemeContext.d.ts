import { type ReactNode } from 'react';
import { getActiveTheme } from './theme.config';
type Theme = ReturnType<typeof getActiveTheme>;
interface ThemeContextValue {
    theme: Theme;
}
export declare function ThemeProvider({ children, theme: themeProp }: {
    children: ReactNode;
    theme?: Theme;
}): import("react").JSX.Element;
export declare function useTheme(): ThemeContextValue;
export {};
