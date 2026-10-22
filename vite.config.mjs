import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  root: './',
  publicDir: 'static',
  plugins: [
    react(),
    glsl()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
