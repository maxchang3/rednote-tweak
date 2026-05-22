import { defineFeature, toggleRootClass } from './utils'

const hideLivelistButton = defineFeature({
  key: 'hideLivelistButton',
  setup: async ({ onFeatureChange }) => {
    await onFeatureChange((enabled) => {
      toggleRootClass('RS_hide-sidebar-nav-livelist', enabled)
    })
  },
})

const hideAIChat = defineFeature({
  key: 'hideAIChat',
  setup: async ({ onFeatureChange }) => {
    await onFeatureChange((enabled) => {
      toggleRootClass('RS_hide-sidebar-nav-ai-chat', enabled)
    })
  },
})

const hidePublishButton = defineFeature({
  key: 'hidePublishButton',
  setup: async ({ onFeatureChange }) => {
    await onFeatureChange((enabled) => {
      toggleRootClass('RS_hide-sidebar-nav-publish', enabled)
    })
  },
})

const hideNotificationButton = defineFeature({
  key: 'hideNotificationButton',
  setup: async ({ onFeatureChange }) => {
    await onFeatureChange((enabled) => {
      toggleRootClass('RS_hide-sidebar-nav-notification', enabled)
    })
  },
})

export const hideNotificationBadge = defineFeature({
  key: 'hideNotificationBadge',
  setup: async ({ onFeatureChange }) => {
    await onFeatureChange((enabled) => {
      toggleRootClass('RS_hide-notification-badge', enabled)
    })
  },
})

export const hideSidebarButton = [
  hideLivelistButton,
  hideAIChat,
  hidePublishButton,
  hideNotificationButton,
  hideNotificationBadge,
] as const
