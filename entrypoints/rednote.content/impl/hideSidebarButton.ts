import { defineRootClassFeature } from './utils'

const hideLivelistButton = defineRootClassFeature(
  'hideLivelistButton',
  'RS_hide-sidebar-nav-livelist',
)

const hideAIChat = defineRootClassFeature('hideAIChat', 'RS_hide-sidebar-nav-ai-chat')

const hidePublishButton = defineRootClassFeature('hidePublishButton', 'RS_hide-sidebar-nav-publish')

const hideNotificationButton = defineRootClassFeature(
  'hideNotificationButton',
  'RS_hide-sidebar-nav-notification',
)

export const hideNotificationBadge = defineRootClassFeature(
  'hideNotificationBadge',
  'RS_hide-notification-badge',
)

export const hideSidebarButton = [
  hideLivelistButton,
  hideAIChat,
  hidePublishButton,
  hideNotificationButton,
  hideNotificationBadge,
] as const
