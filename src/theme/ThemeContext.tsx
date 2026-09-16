import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { getActiveTheme } from './theme.config';

type Theme = ReturnType<typeof getActiveTheme>;

interface ThemeContextValue {
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children, theme: themeProp }: { children: ReactNode; theme?: Theme }) {
    const theme = themeProp ?? getActiveTheme();

    // Sync all theme values to CSS custom properties on mount and theme change
    useEffect(() => {
        const root = document.documentElement;
        const colors = theme.colors;

        // Backgrounds
        root.style.setProperty('--theme-bg-main', colors.bg.main);
        root.style.setProperty('--theme-bg-main-from', colors.bg.mainFrom);
        root.style.setProperty('--theme-bg-main-via', colors.bg.mainVia);
        root.style.setProperty('--theme-bg-main-to', colors.bg.mainTo);
        root.style.setProperty('--theme-bg-card', colors.bg.card);
        root.style.setProperty('--theme-bg-card-alt', colors.bg.cardAlt);
        root.style.setProperty('--theme-bg-sidebar', colors.bg.sidebar);
        root.style.setProperty('--theme-bg-header', colors.bg.header);
        root.style.setProperty('--theme-bg-footer', colors.bg.footer);

        // Text
        root.style.setProperty('--theme-text-primary', colors.text.primary);
        root.style.setProperty('--theme-text-secondary', colors.text.secondary);
        root.style.setProperty('--theme-text-muted', colors.text.muted);
        root.style.setProperty('--theme-text-on-dark', colors.text.onDark);

        // Primary
        root.style.setProperty('--theme-primary', colors.primary.DEFAULT);
        root.style.setProperty('--theme-primary-light', colors.primary.light);
        root.style.setProperty('--theme-primary-dark', colors.primary.dark);

        // Secondary (gold/accent)
        root.style.setProperty('--theme-secondary', colors.secondary.DEFAULT);
        root.style.setProperty('--theme-secondary-light', colors.secondary.light);
        root.style.setProperty('--theme-secondary-dark', colors.secondary.dark);

        // Hover states
        root.style.setProperty('--theme-hover-card', colors.hover.card);
        root.style.setProperty('--theme-hover-sidebar', colors.hover.sidebar);
        root.style.setProperty('--theme-hover-button', colors.hover.button);
        root.style.setProperty('--theme-hover-link', colors.hover.link);

        // Effects
        root.style.setProperty('--theme-shadow', colors.shadow);
        root.style.setProperty('--theme-shadow-dark', colors.shadowDark);
        root.style.setProperty('--theme-glow', colors.glow);
        root.style.setProperty('--theme-border', colors.border);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
