import { defineFeature, toggleRootClass } from './utils'

const ROOT_CLASS_NAME = 'RS_hide-search-suggestions' as const

export const hideSearchSuggestions = defineFeature({
  key: 'hideSearchSuggestions',
  setup: async ({ onFeatureChange }) => {
    await onFeatureChange((enabled) => {
      toggleRootClass(ROOT_CLASS_NAME, enabled)
    })
  },
})
