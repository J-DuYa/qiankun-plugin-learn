/**
 * 手写 qiankun，理解 qiankun 的实现逻辑
 * ⛽️
*/
// export { loadMicroApp } from './loadMicroApp'
import { handleRouter } from './handle-router'
import { rewriteRouter } from './rewrite-router'

let _apps = []

export const getApps = () => _apps

export const registerMicroApps = function (apps) {
  _apps = apps
}

export const start = function () {
  // 监视路由变化
  rewriteRouter()

  // 初始化执行
  handleRouter()
}
