import { rewriteRouter } from './rewrite-router'

let _apps = []

export const getApps = () => _apps

export const registerMicroApps = apps => {
  _apps = apps
}

export const start = () => {
  // 对路由进行劫持
  rewriteRouter()

  // 第一次进入路由的时候进行触发
  handleRouter()
}
