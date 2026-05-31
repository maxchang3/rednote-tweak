export const STORAGE_KEY_FEATURE_PREFIX = (<const>'local:feature:') satisfies StorageItemKey

export const getFeatureStorageKey = (featureKey: FeatureKey) =>
  `${STORAGE_KEY_FEATURE_PREFIX}${featureKey}` as const

export const getFeatureValue = async (key: FeatureKey): Promise<boolean> => {
  return (await storage.getItem<boolean>(getFeatureStorageKey(key))) ?? FEATURE_DEFAULTS[key]
}

export const watchFeatureValue = (
  key: FeatureKey,
  callback: (value: boolean) => void,
): (() => void) => {
  return storage.watch<boolean>(getFeatureStorageKey(key), (nextValue) => {
    callback(nextValue ?? FEATURE_DEFAULTS[key])
  })
}
