export const STORAGE_KEY_LOCALE = 'local:locale'
export const STORAGE_KEY_FEATURE_PREFIX = 'local:feature:' as const

export const FEATURE_GROUPS = [
  {
    groupId: 'general',
    features: [
      { id: 'searchSelectedText', default: true },
      { id: 'hideFeed', default: true },
      { id: 'hideSearchSuggestions', default: true },
      { id: 'slashFocus', default: true },
    ],
  },
  {
    groupId: 'sidebar',
    features: [
      { id: 'hideLivelistButton', default: true },
      { id: 'hideAIChat', default: false },
      { id: 'hidePublishButton', default: false },
      { id: 'hideNotificationButton', default: false },
      { id: 'hideNotificationBadge', default: false },
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
