/**
 * Vite config for the ADA preview app — used ONLY by scripts/test-ada.js.
 * Not used in the library build.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    root: resolve(__dirname, 'src/preview'),
    resolve: {
        alias: { '@': resolve(__dirname, 'src') },
    },
});
