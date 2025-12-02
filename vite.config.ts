import path from 'node:path'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app/javascript'),
      '@': path.resolve(__dirname, './app/javascript'),
      '@components': path.resolve(__dirname, './app/javascript/components'),
      '@ui': path.resolve(__dirname, './app/javascript/components/ui'),
      '@domain': path.resolve(__dirname, './app/javascript/domain'),
      '@infra': path.resolve(__dirname, './app/javascript/infrastructure'),
      '@features': path.resolve(__dirname, './app/javascript/components/features'),
      '@lib': path.resolve(__dirname, './app/javascript/lib'),
      '@composables': path.resolve(__dirname, './app/javascript/composables'),
    },
  },
})
