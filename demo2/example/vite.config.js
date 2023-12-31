import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  base: 'http://localhost:8080/',
  // 配置 vite 输出基础组件
  plugins: [
    createVuePlugin(),
    qiankun('micro-vue-duya', {
      useDevMode: true,
    })
  ],
  server: {
    port: '8080',
    cors: true,
    origin: 'http://localhost:8080'
  },
})
