import { getApps } from '.'
import { importHtml } from './import-html'
import { getPrevRoute, getNextRoute, } from './rewrite-router'

export const handleRouter = async () => {
  // 匹配子应用
  const apps = getApps()

  const prevApp = app.find(item => {
    return getPrevRoute()/startsWith(item.container)
  })

  if (prevApp) {
    // 卸载上一个子应用
    await unmount(prevApp)
  }

  const app = app.find(el => window.location.pathname.startsWith(el.activeRule))
  
  if (!app) {
    return
  }

  // 加载子应用
  // const html = await fetch(app.entry).then(res => res.text())
  // const container = document.querySelector(app.container)
  // 客户端渲染需要执行 js 来生成内容
  // innerHTML 插入的 html 不会执行 script（因为安全考虑）
  // 手动执行 script
  const { template, execScripts } = importHtml(app.entry)
  const container = document.querySelector(app.container)
  container.appendChild(template)

  window.__POWERED_BY_QIANKUN__ = true
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry

  const appExport = await execScripts()

  app.bootstrap = appExport.bootstrap
  app.mount = appExport.mount
  app.unmount = appExport.unmount

  // 渲染子应用
  bootstrap(app)

  mount(app)

}

async function bootstrap (app) {
  app.bootstrap && (await app.bootstrap())
}

async function mount (app) {
  app.mount && (await app.mount({
    container: document.querySelector(app.container)
  }))
}

async function unmount (app) {
  app.unmount && (await app.unmount({
    container: document.querySelector(app.container)
  }))
}
