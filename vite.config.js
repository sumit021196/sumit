import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    host: true, // Listen on all addresses
    hmr: {
      port: 3001, // Separate HMR port to avoid conflicts
    },
    // Performance optimizations
    fs: {
      strict: false, // Allow serving files outside root
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled'],
  },
  // Development performance optimizations
  esbuild: {
    target: 'esnext',
  },
});