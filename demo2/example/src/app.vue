<template>
  <div>
    <div>这是子应用</div>
  </div>
</template>
<script>
import axios from 'axios'
import { loadMicroApp } from 'qiankun'
// import { compileToFunctions } from 'vue'
export default {
  name: 'TestButton',
  data () {
    return {
      // ...
    }
  },
  created () {
    console.log('进入路由界面', this)
    this.getReadmd()
    // this.reigsterMicro()
    // console.log('测试构建模板', compileToFunctions(`<div>测试</div>`))
  },
  methods: {
    // 注册微应用
    reigsterMicro () {
      loadMicroApp({
        name: 'micro-vue-duya',
        entry: '//localhost:',
        container: '#duya',
      })
    },
    // 获取组件 README 文档
    getReadmd() {
      // TODO
      axios({
        method: 'GET',
        // 使用 ONLINE address - e.g. OSS 地址
        url: '/api/button/README.md',
      }).then(res => {
        console.log('获取文档数据')
      })
    }
  },
}
</script>
