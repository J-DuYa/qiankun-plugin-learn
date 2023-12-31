export const loadMicroApp = function (
  app = {}, // 应用信息
  configuration,
) {
  console.log('⛽️ 进入 duyacode 写的 fakeQiankun 逻辑中...')

  console.log(
    `配置文件`,
    app,
  )

  const { name, entry, container, props } = app
  
  // 路由劫持
  window.history.pushState = function (...args) {
    console.log('进入重写的路由劫持')
  }

}