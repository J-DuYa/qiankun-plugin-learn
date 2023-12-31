import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'DuYaButton'
    },
    rollupOptions: {
      external: ['vue'], // 将 Vue 作为外部依赖，不会被打包进组件库
      output: {
        globals: {
          vue: 'Vue' // 将 Vue 指定为全局变量，方便在外部项目中使用
        }
      }
    }
  },
  // 配置 vite 输出基础组件
  plugins: [createVuePlugin()]
}
