import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ─── Build Optimization ───────────────────────────────────
  build: {
    target: 'es2015',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
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
