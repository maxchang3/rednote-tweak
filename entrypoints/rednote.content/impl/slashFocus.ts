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
        // Avoid focusing the search input when typing in an input, textarea, or contenteditable element
        const target = event.target as HTMLElement | null
        if (
          target &&
          (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
        ) {
          return
        }

        if (event.key !== '/') return

        const input = document.querySelector<HTMLInputElement>('#search-input')
        if (!input) return

        event.preventDefault()
        // First, try to find the AI search textarea (if it exists), otherwise fall back to the old search input
        const aiInputs = document.querySelectorAll<HTMLElement>('textarea[name="aiSearchTextarea"]')

        const targets =
          aiInputs.length > 0 ? aiInputs : document.querySelectorAll<HTMLElement>('#search-input')

        if (targets.length > 0) {
          // Always focus the last input
          targets[targets.length - 1].focus()
        }
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
