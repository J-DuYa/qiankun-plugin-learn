import { getApps } from './micro'
import { importHTML } from './import-html'
import { getPrevRoute } from './rewrite-router'

export const handleRouter = async () => {

  const apps = getApps()

  const prevRoute = getPrevRoute()
  const prevApp = apps.find(
    el => prevRoute.startsWith(el.activeRule)
  )

  if (prevApp) {
    unmount(prevApp)
  }

  const app = apps.find(el => window.location.pathname.startsWith(el.activeRule))

  // 说明没有匹配上
  if (!app) {
    return
  }

  // 匹配上之后，开始加载微应用
  const container = document.querySelector(app.container)
  const { template, execScripts } = await importHTML(app.entry)
  container.appendChild(template)

  // 执行
  const exportScript = await execScripts()

  app.bootstrap = exportScript.bootstrap
  app.mount = exportScript.mount
  app.unmount = exportScript.unmount

  bootstrap(app)

  mount(app)
}

async function bootstrap (app) {
  app.bootstrap && (await app.bootstrap())
}

async function mount (app) {
  app.mount && (await app.mount({
    container: app.container,
  }))
}

async function unmount (app) {
  app.unmount && (await app.unmount({
    container: app.container,
  }))
}
