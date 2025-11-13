import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   open: true,          
    //   gzipSize: true,      
    //   brotliSize: true,    
    //   filename: 'dist/stats.html'
    // })
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          
          'vendor-three': ['three'],
          
          'vendor-r3f': ['@react-three/fiber', '@react-three/drei'],
        }
      }
    },
    chunkSizeWarningLimit: 800,
  }
})