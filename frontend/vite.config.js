import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ─── Build Optimization ───────────────────────────────────
  build: {
    target: 'es2015',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal caching
        manualChunks: {
          // Core React runtime — rarely changes
          'vendor-react': ['react', 'react-dom'],
          // Routing — rarely changes
          'vendor-router': ['react-router-dom'],
          // Framer motion — large, isolate it
          'vendor-motion': ['framer-motion'],
          // Supabase — large, isolate it
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
  },

  // ─── Dev Server ───────────────────────────────────────────
  server: {
    // No proxy needed — all API calls go to Supabase directly
    port: 5173,
  },

  // ─── Performance ──────────────────────────────────────────
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
});
