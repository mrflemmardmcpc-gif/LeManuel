import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Relaxe l'alerte de taille de chunk sans bloquer le build
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      // Découpe les dépendances principales pour garder des bundles plus lisibles
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
