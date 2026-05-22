export const getFeatureStorageKey = (featureKey: FeatureKey) =>
  `${STORAGE_KEY_FEATURE_PREFIX}${featureKey}` as const
