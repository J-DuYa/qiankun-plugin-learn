import Vue from 'vue'
import App from './app.vue'
import './public-path'
import './index.less'

new Vue({
  render: h => h(App),
}).$mount('#app')
