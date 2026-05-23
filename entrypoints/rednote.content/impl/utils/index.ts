import type { FeatureRegistration } from '@/entrypoints/rednote.content/features'

const rootClassList = document.documentElement.classList

export const toggleRootClass = (className: string, enabled: boolean) => {
  rootClassList.toggle(className, enabled)
}

export const defineFeature = <T extends FeatureKey>(
  feature: FeatureRegistration<T>,
): FeatureRegistration<T> => feature

/** Create a feature that simply toggles a root class on/off */
export const defineRootClassFeature = (key: FeatureKey, className: string) =>
  defineFeature({
    key,
    setup: async ({ onFeatureChange }) => {
      await onFeatureChange((enabled) => {
        toggleRootClass(className, enabled)
      })
    },
  })
