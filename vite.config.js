import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url))
    },
  },
  server: {
    historyApiFallback: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (id.includes('@fortawesome')) {
            return 'fontawesome-vendor'
          }

          if (id.includes('lucide-vue-next')) {
            return 'lucide-vendor'
          }

          if (id.includes('vue') || id.includes('pinia') || id.includes('@vueuse')) {
            return 'vue-vendor'
          }

          if (id.includes('@emailjs')) {
            return 'email-vendor'
          }

          return 'vendor'
        }
      }
    }
  }
})


