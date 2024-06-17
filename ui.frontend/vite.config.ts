import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, 'dist/clientlib-site'),
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['iife'],
      name: 'site.bundle',
    },
    rollupOptions: {
      output: {
        assetFileNames: (file) => {
          if (file.name?.endsWith('.css')) {
            return 'site.bundle.[ext]';
          }
          return `resources/[name].[ext]`;
        },
        entryFileNames: `site.bundle.js`,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  root: path.join(__dirname, 'src'),
  plugins: [],
  server: {
    port: 3000,
    proxy: {
      '^/etc.clientlibs/.*': {
        changeOrigin: true,
        target: 'http://localhost:4502',
      },
    },
  },
});