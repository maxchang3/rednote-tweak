import { defineFeature, toggleRootClass } from './utils'

const ROOT_CLASS_NAME = 'RS_hide-feed' as const

export const hideFeed = defineFeature({
  key: 'hideFeed',
  setup: async ({ onRouteChange, onFeatureChange }) => {
    let isEnabled = true
    let currentPath = location.pathname

    const apply = () => {
      toggleRootClass(
        ROOT_CLASS_NAME,
        isEnabled && currentPath.startsWith('/explore') && !currentPath.startsWith('/explore/'),
      )
    }

    await onFeatureChange((nextEnabled) => {
      isEnabled = nextEnabled
      apply()
    })

    onRouteChange((path) => {
      currentPath = path
      apply()
    })
  },
})
