import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.js'),
      name: 'VueRangeDual',
      fileName: (format) => `vue-range-dual.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'auto',
        globals: {
          vue: 'Vue'
        },
      }
    }
  }
})
