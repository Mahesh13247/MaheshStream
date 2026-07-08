import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      visualizer({
        filename: 'dist/stats.html',
        open: process.env.NODE_ENV !== 'production',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-icons')) {
              return 'icons'
            }
          },
        },
      },
      sourcemap: false,
    },
    server: {
      open: true,
    },
  }
})
