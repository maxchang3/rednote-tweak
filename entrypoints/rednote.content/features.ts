import type { ContentScriptContext } from 'wxt/utils/content-script-context'
import { initRouter, onRouteChange } from './router'
import {
  hideFeed,
  hideNotificationBadge,
  hideSearchSuggestions,
  hideSidebarButton,
  slashFocus,
} from './impl'

interface FeatureContext {
  key: FeatureKey
  ctx: ContentScriptContext
  onRouteChange: (cb: (path: string) => void) => () => void
  onFeatureChange: (onChange: (enabled: boolean) => void) => Promise<void>
  onDispose: (cleanup: () => void) => void
}

export interface FeatureRegistration<T extends FeatureKey> {
  key: T
  setup: (featureContext: FeatureContext) => void | Promise<void>
}

const featureRegistrations = [
  hideFeed,
  hideSearchSuggestions,
  hideNotificationBadge,
  slashFocus,
  ...hideSidebarButton,
] as const

const createFeatureContext = (ctx: ContentScriptContext, key: FeatureKey): FeatureContext => {
  const disposers: Array<() => void> = []

  ctx.onInvalidated(() => {
    for (const dispose of disposers.splice(0)) {
      try {
        dispose()
      } catch (error) {
        console.error('[features] feature dispose failed', error)
      }
    }
  })

  return {
    key,
    ctx,
    onRouteChange,
    onDispose: (cleanup) => {
      disposers.push(cleanup)
    },
    onFeatureChange: async (onChange) => {
      onChange(await getFeatureValue(key))
      disposers.push(watchFeatureValue(key, onChange))
    },
  }
}

export const initFeatures = async (ctx: ContentScriptContext) => {
  initRouter(ctx)

  await Promise.all(
    featureRegistrations.map(({ key, setup }) =>
      Promise.resolve(setup(createFeatureContext(ctx, key))),
    ),
  )
}
