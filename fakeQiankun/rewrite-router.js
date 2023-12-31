import { handleRouter } from './handle-router'

let prevRoute = ''
let nextRoute = ''

export const getPrevRoute = () => prevRoute
export const getNextRoute = () => nextRoute

export const rewriteRouter = () => {
  // hash 忽略
  // history API
  window.addEventListener('popState', () => {
    prevRoute = nextRoute
    nextRoute = window.location.pathname
    handleRouter()
  })
  
  const rawPushState = window.location.pushState
  window.location.pushState = (...args) => {
    prevRoute = window.location.pathname
    rawPushState.apply(window.location, ...args)
    nextRoute = window.location.pathname
    handleRouter()
  }

  const rawReplaceState = window.location.replaceState
  window.location.replaceState = (...args) => {
    prevRoute = window.location.pathname
    rawReplaceState.apply(window.location, ...args)
    nextRoute = window.location.pathname
    handleRouter()
  }
}
