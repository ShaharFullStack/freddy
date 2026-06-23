/**
 * Vite config: React + Tailwind 4. Build uses manualChunks to split vendor bundles
 * (React, Three.js, GSAP) for better caching; chunkSizeWarningLimit raised for the large Three bundle.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    fs: {
      // Allow Vite to read image assets from the FreddyLanding root (two levels up)
      allow: ['../../']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
