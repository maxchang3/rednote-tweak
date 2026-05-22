import type { ContentScriptContext } from 'wxt/utils/content-script-context'
import { storage } from 'wxt/utils/storage'
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
      const storageKey = getFeatureStorageKey(key)
      const defaultEnabled = FEATURE_DEFAULTS[key]

      onChange((await storage.getItem<boolean>(storageKey)) ?? defaultEnabled)

      const unwatch = storage.watch<boolean>(storageKey, (nextValue) => {
        onChange(nextValue ?? defaultEnabled)
      })

      disposers.push(unwatch)
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
