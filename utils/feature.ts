export const getFeatureStorageKey = (featureKey: FeatureKey) =>
  `${STORAGE_KEY_FEATURE_PREFIX}${featureKey}` as const

export async function getFeatureValue(key: FeatureKey): Promise<boolean> {
  return (await storage.getItem<boolean>(getFeatureStorageKey(key))) ?? FEATURE_DEFAULTS[key]
}

export function watchFeatureValue(key: FeatureKey, callback: (value: boolean) => void): () => void {
  return storage.watch<boolean>(getFeatureStorageKey(key), (nextValue) => {
    callback(nextValue ?? FEATURE_DEFAULTS[key])
  })
}
