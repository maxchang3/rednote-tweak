import {
  type UseAsyncStateOptions,
  type UseAsyncStateReturnBase,
  useAsyncState,
} from '@vueuse/core'

type UseStoredValueResult<T> = readonly [
  WritableComputedRef<T>,
  Omit<UseAsyncStateReturnBase<T, [], true>, 'execute' | 'state'>,
]

function useStoredValue<T>(
  key: StorageItemKey,
  initialValue: T,
  opts?: UseAsyncStateOptions<true, T>,
): UseStoredValueResult<T>
function useStoredValue<T>(
  key: StorageItemKey,
  initialValue?: T,
  opts?: UseAsyncStateOptions<true, T | undefined>,
): UseStoredValueResult<T | undefined>
function useStoredValue<T>(
  key: StorageItemKey,
  initialValue?: T,
  opts?: UseAsyncStateOptions<true, T | undefined>,
) {
  const {
    state,
    execute: _, // Don't include "execute" in returned object
    ...asyncState
  } = useAsyncState<T | undefined, [], true>(
    async () => {
      const value = await storage.getItem<T>(key)
      return value ?? initialValue
    },
    initialValue,
    opts,
  )

  // Listen for changes
  let unwatch: (() => void) | undefined
  onMounted(() => {
    unwatch = storage.watch<T>(key, (newValue) => {
      state.value = newValue ?? initialValue
    })
  })
  onUnmounted(() => {
    unwatch?.()
  })

  return [
    // Use a writable computed ref to write updates to storage
    computed({
      get() {
        return state.value
      },
      set(newValue) {
        state.value = newValue

        // If newValue is undefined, remove the item from storage to avoid cluttering it with undefined values.
        if (newValue === undefined) {
          void storage.removeItem(key)
        } else {
          void storage.setItem(key, newValue)
        }
      },
    }),
    asyncState,
  ] as const
}
export default useStoredValue
