import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const HOST = '0.0.0.0'
const BASE = './'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/css/lib-mixin";
          @import "@/assets/css/_lib-color";
          @import "@/assets/css/_lib-fontSize";
          `
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src')
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js'
      }
    ],
    extensions: ['.vue', '.js']
  },
  server: {
    host: HOST,
    port: process.env.PORT,
    fs: {
      // 可以为项目根目录的上一级提供服务
      allow: ['..']
    }
  }
})
