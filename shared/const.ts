export const STORAGE_KEY_LOCALE = (<const>'local:locale') satisfies StorageItemKey
export const STORAGE_KEY_SKIP_INTL_ALERT = (<const>'local:skipIntlAlert') satisfies StorageItemKey

export const FEATURE_GROUPS = [
  {
    groupId: 'general',
    features: [
      { id: 'slashFocus', default: true },
      { id: 'contextMenuSearch', default: true },
      { id: 'useIntlSearch', default: false, onlyAt: 'intl' },
    ],
  },
  {
    groupId: 'explore',
    features: [
      { id: 'hideFeed', default: true },
      { id: 'hideSearchSuggestions', default: true },
    ],
  },
  {
    groupId: 'sidebar',
    features: [
      { id: 'hideLivelistButton', default: true, onlyAt: 'main' },
      { id: 'hideAIChat', default: false, onlyAt: 'main' },
      { id: 'hideRedVideo', default: true, onlyAt: 'main' },
      { id: 'hidePublishButton', default: false, onlyAt: 'main' },
      { id: 'hideNotificationButton', default: false },
      { id: 'hideNotificationBadge', default: false },
      { id: 'hideWorldcup', default: false, onlyAt: 'main' },
    ],
  },
] as const

type FeatureGroup = (typeof FEATURE_GROUPS)[number]

export type FeatureKey = FeatureGroup['features'][number]['id']

export const FEATURE_KEYS = FEATURE_GROUPS.flatMap((g) => g.features.map((f) => f.id))

export const FEATURE_DEFAULTS = Object.fromEntries(
  FEATURE_GROUPS.flatMap((g) => g.features.map((f) => [f.id, f.default])),
) as {
  [K in FeatureKey]: boolean
}
