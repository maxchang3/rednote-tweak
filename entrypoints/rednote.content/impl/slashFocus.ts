import { defineFeature } from './utils'

export const slashFocus = defineFeature({
  key: 'slashFocus',
  setup: async ({ ctx, onFeatureChange, onDispose }) => {
    let removeListener = () => {}

    const syncListener = (enabled: boolean) => {
      removeListener()
      removeListener = () => {}

      if (!enabled) return

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== '/') return

        const input = document.querySelector<HTMLInputElement>('#search-input')
        if (!input) return

        event.preventDefault()
        input.focus()
      }

      ctx.addEventListener(document, 'keydown', onKeyDown)
      removeListener = () => {
        document.removeEventListener('keydown', onKeyDown)
      }
    }

    await onFeatureChange(syncListener)

    onDispose(() => {
      removeListener()
    })
  },
})
