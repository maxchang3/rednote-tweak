import type { ContentScriptContext } from 'wxt/utils/content-script-context'

type RouteListener = (path: string) => void

const listeners = new Set<RouteListener>()
let currentPath = ''
let isInitialized = false

export const getCurrentPath = () => {
  return currentPath || location.pathname
}

export const onRouteChange = (cb: RouteListener) => {
  listeners.add(cb)

  try {
    cb(getCurrentPath())
  } catch (error) {
    console.error('[router] route listener failed on immediate call', error)
  }

  return () => {
    listeners.delete(cb)
  }
}

export const initRouter = (ctx: ContentScriptContext) => {
  if (isInitialized) return
  isInitialized = true

  const emit = (nextPath: string) => {
    if (nextPath === currentPath) return

    currentPath = nextPath
    listeners.forEach((cb) => {
      try {
        cb(nextPath)
      } catch (error) {
        console.error('[router] route listener failed', error)
      }
    })
  }

  emit(getCurrentPath())
  // https://wxt.dev/guide/essentials/content-scripts.html#dealing-with-spas
  ctx.addEventListener(window, 'wxt:locationchange', (event) => {
    emit(event.newUrl.pathname)
  })
}
