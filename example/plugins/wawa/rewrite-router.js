import { handleRouter } from "./handle-router"

let prevRoute = ''
let nextRoute = window.location.pathname

export const getPrevRoute = () => prevRoute
export const getNextRoute = () => nextRoute

export const rewriteRouter = () => {
    // hash 路由 
  // history 路由
  // history.go history.back history.forward 
  // pushState, replaceState
  window.addEventListener('popstate', function () {
    console.log(
      `监听前进、后退`
    )
    prevRoute = nextRoute
    nextRoute = window.location.pathname
    handleRouter()
  })

  const rawPushState = window.history.pushState
  window.history.pushState = (...args) => {
    prevRoute = window.location.pathname
    rawPushState.apply(window.history, args)
    nextRoute = window.location.pathname
    handleRouter()
  }

  const rawReplaceState = window.history.replaceState
  window.history.replaceState = (...args) => {
    prevRoute = window.location.pathname
    rawReplaceState.apply(window.history, args)
    nextRoute = window.location.pathname
    handleRouter()
  }
  
}