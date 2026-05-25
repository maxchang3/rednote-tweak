export function useFeature(key: FeatureKey) {
  const storageKey = getFeatureStorageKey(key)
  const [state, rest] = useStoredValue<boolean>(storageKey, FEATURE_DEFAULTS[key])
  return [state, rest] as const
}

export function useFeatureMap() {
  const featureMap = {} as Record<FeatureKey, Ref<boolean>>
  const readyList: Ref<boolean>[] = []
  for (const key of FEATURE_KEYS) {
    const [state, { isReady }] = useFeature(key)
    featureMap[key] = state
    readyList.push(isReady)
  }
  const isReady = computed(() => readyList.every((r) => r.value === true))
  return { featureMap, isReady }
}
