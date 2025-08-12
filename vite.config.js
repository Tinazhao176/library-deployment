import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 添加优化的依赖配置
const optimizedDeps = {
  include: [
    'pinia',
   
    'firebase/app',
    'firebase/firestore',
    'firebase/auth',
    'primevue',
    '@primevue/themes/aura',
    'vue-router',
    'axios',
    'primevue/datatable',
    'primevue/column'
  ],
  exclude: ['firebase']
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 添加优化的依赖配置
  optimizeDeps: optimizedDeps
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/library-deployment/'  // 替换为你的 GitHub 仓库名
    : '/'
}