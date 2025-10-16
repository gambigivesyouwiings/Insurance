import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Production optimizations
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          emailjs: ['@emailjs/browser']
        }
      }
    },
    // Optimize assets
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000
  },
  // Base URL configuration
  base: '/',
  // Define environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})
