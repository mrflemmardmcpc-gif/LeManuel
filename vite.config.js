import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Relaxe l'alerte de taille de chunk sans bloquer le build
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('tiptap') || id.includes('prosemirror')) return 'tiptap';
            if (id.includes('react')) return 'vendor';
            return 'vendor';
          }
        },
      },
    },
  },
})
