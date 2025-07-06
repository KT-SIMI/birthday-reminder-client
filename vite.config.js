import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5373,
    strictPort: true,
    open: true
  },
  build: {
    emptyOutDir: true,
    sourcemap: true
  },
  css: {
    devSourcemap: true
  }
})
