export interface ThemeColors {
    primary: {
        DEFAULT: string;
        light: string;
        dark: string;
    };
    secondary: {
        DEFAULT: string;
        light: string;
        dark: string;
    };
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
export declare const APP_THEME: Theme;
export declare const getActiveTheme: () => Theme;
