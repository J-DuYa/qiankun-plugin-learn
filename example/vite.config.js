import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  // 配置 vite 输出基础组件
  plugins: [createVuePlugin()]
})
