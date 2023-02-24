import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',
  resolve: {
    alias: {
      'src/': '/src/',
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:7001',
    },
  },
})
