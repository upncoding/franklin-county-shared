// =====================================================
// THEME CONFIGURATION
// =====================================================

export interface ThemeColors {
    primary: { DEFAULT: string; light: string; dark: string };
    secondary: { DEFAULT: string; light: string; dark: string };
    bg: {
        main: string;
        mainFrom: string;
        mainVia: string;
        mainTo: string;
        card: string;
        cardAlt: string;
        sidebar: string;
        header: string;
        footer: string;
    };
    text: {
        primary: string;
        secondary: string;
        muted: string;
        onDark: string;
    };
    hover: {
        card: string;
        sidebar: string;
        button: string;
        link: string;
    };
    shadow: string;
    shadowDark: string;
    glow: string;
    border: string;
}

export interface Theme {
    name: string;
    colors: ThemeColors;
}

export const APP_THEME: Theme = {
    name: 'Vibrant Adirondack',
    colors: {
        // =====================================================
        // PRIMARY BRAND COLORS
        // =====================================================
        primary: {
            DEFAULT: '#166534', // Forest Green 800 (High Contrast)
            light: '#15803d',   // Green 700
            dark: '#14532d'     // Green 900
        },
        secondary: {
            DEFAULT: '#eab308', // Golden Yellow (Accents)
            light: '#facc15',
            dark: '#ca8a04'     // Darkened for better contrast
        },

        // =====================================================
        // BACKGROUNDS
        // =====================================================
        bg: {
            main: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7, #f7fee7)',
            mainFrom: '#f0fdf4',
            mainVia: '#dcfce7',
            mainTo: '#f7fee7',

            card: '#ffffff',
            cardAlt: 'linear-gradient(to bottom right, #ffffff, #fefefe, #ecfccb)',

            sidebar: 'rgba(255, 255, 255, 0.95)',
            header: 'linear-gradient(to right, #166534, #14532d, #166534)',
            footer: '#166534',
        },

        // =====================================================
        // TEXT COLORS
        // =====================================================
        text: {
            primary: '#052e16',   // Main Text (Very Dark Green)
            secondary: '#14532d', // Secondary Text (Dark Green)
            muted: '#365314',     // Muted Text
            onDark: '#ffffff',    // Text on dark backgrounds (Header/Footer)
        },

        // =====================================================
        // INTERACTIVE STATES
        // =====================================================
        hover: {
            card: '#f0fdf4',      // Card hover tint
            sidebar: '#ffffff',   // Sidebar hover
            button: '#dcfce7',    // Button hover
            link: '#ca8a04',      // Link hover
        },

        // =====================================================
        // EFFECTS (Borders, Shadows, Glows)
        // =====================================================
        shadow: 'rgba(21, 128, 61, 0.12)',
        shadowDark: 'rgba(21, 128, 61, 0.3)',
        glow: 'rgba(50, 205, 50, 0.4)',
        border: 'rgba(22, 163, 74, 0.2)',
    }
};

// Return the single active theme
export const getActiveTheme = (): Theme => APP_THEME;
