import { type UseAsyncStateOptions, useAsyncState } from '@vueuse/core'
import { computed, onMounted, onUnmounted } from 'vue'
import { type StorageItemKey, storage } from 'wxt/utils/storage'

export default function <T>(
  key: StorageItemKey,
  initialValue?: T,
  opts?: UseAsyncStateOptions<true, T | null>,
) {
  const {
    state,
    execute: _, // Don't include "execute" in returned object
    ...asyncState
  } = useAsyncState<T | null, [], true>(
    async () => (await storage.getItem<T>(key)) ?? initialValue ?? null,
    initialValue ?? null,
    opts,
  )

  // Listen for changes
  let unwatch: (() => void) | undefined
  onMounted(() => {
    unwatch = storage.watch<T>(key, async (newValue) => {
      state.value = newValue ?? initialValue ?? null
    })
  })
  onUnmounted(() => {
    unwatch?.()
  })

  return {
    // Use a writable computed ref to write updates to storage
    state: computed({
      get() {
        return state.value
      },
      set(newValue) {
        state.value = newValue
        void storage.setItem(key, newValue)
      },
    }),
    ...asyncState,
  }
}
