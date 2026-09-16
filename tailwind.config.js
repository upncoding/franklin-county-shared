import { getActiveTheme } from './src/theme/theme.config.js';

const theme = getActiveTheme();

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Franklin County brand colors — auto-generated from theme.config
                'county-blue': theme.colors.primary,
                'county-gold': theme.colors.secondary,
                'county-charcoal': '#1a1a1a',
                'county-blue-dark': theme.colors.primary.dark,
                'county-blue-light': theme.colors.primary.light,
                'county-gold-light': theme.colors.secondary.light,
                'county-gold-dark': theme.colors.secondary.dark,

                // Legacy aliases (kept for compatibility)
                'fc-blue': {
                    DEFAULT: '#3B7AC7',
                    dark: '#2B5A97',
                    darker: '#1B3A67',
                },
                'fc-gold': {
                    DEFAULT: '#D4A574',
                    light: '#E4B584',
                },
            },
            fontFamily: {
                serif: ['Merriweather', 'serif'],
                sans: ['Open Sans', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #1B3A67 0%, #2A4A7A 50%, #1F2937 100%)',
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
            },
            boxShadow: {
                'float': '0 20px 60px -15px rgba(0, 0, 0, 0.4), 0 10px 20px -10px rgba(0, 0, 0, 0.3)',
                'float-lg': '0 30px 80px -20px rgba(0, 0, 0, 0.5), 0 15px 30px -15px rgba(0, 0, 0, 0.4)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
                'glow-blue': '0 0 20px rgba(0, 64, 128, 0.3), 0 0 40px rgba(0, 64, 128, 0.1)',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            transitionDuration: {
                '400': '400ms',
            },
        },
    },
    plugins: [],
};
