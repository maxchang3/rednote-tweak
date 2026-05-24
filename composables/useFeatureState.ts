export function useFeatureStateMap() {
  const featureStateMap = {} as Record<FeatureKey, Ref<boolean>>
  const readyList: Ref<boolean>[] = []
  for (const key of FEATURE_KEYS) {
    const storageKey = getFeatureStorageKey(key)
    const { state, isReady } = useStoredValue<boolean>(storageKey, FEATURE_DEFAULTS[key])
    featureStateMap[key] = state as Ref<boolean>
    readyList.push(isReady)
  }
  const isReady = computed(() => readyList.every((r) => r.value === true))
  return { featureStateMap, isReady }
}
