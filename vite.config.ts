import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'FranklinCountyShared',
            formats: ['es', 'cjs'],
            fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
        },
        rollupOptions: {
            // Exclude peer dependencies from the bundle
            external: ['react', 'react-dom', 'react/jsx-runtime', 'react-router-dom', 'framer-motion', '@floating-ui/react'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router-dom': 'ReactRouterDOM',
                },
                // Keep CSS separate so consumers can import it explicitly
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css' || assetInfo.name?.endsWith('.css')) return 'styles/index.css';
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
        // Generate source maps for easier debugging in consuming sites
        sourcemap: true,
        // Don't clear dist so tsc-generated .d.ts files survive
        emptyOutDir: false,
    },
    // Resolve path alias for cleaner imports inside the package
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
