import eyesOffSvg from '~/assets/eyes-off.svg?raw'
import eyesOnSvg from '~/assets/eyes-on.svg?raw'
import { defineFeature } from './utils'

const TOGGLE_CLASS_NAME = 'RS_feed-toggle'
const TOGGLE_WRAPPER_CLASS_NAME = 'RS_feed-toggle-wrapper'
const ANCHOR_SELECTOR = `#exploreFeeds > .floating-btn-sets > .reload:not(.${TOGGLE_CLASS_NAME})`

const renderButtonState = (button: HTMLElement, isFeedHidden: boolean) => {
  const iconEl = button.querySelector<HTMLElement>('.btn-wrapper')
  const tipEl = button.querySelector<HTMLElement>('.tip-text')

  if (iconEl) iconEl.innerHTML = isFeedHidden ? eyesOnSvg : eyesOffSvg
  if (tipEl) tipEl.textContent = isFeedHidden ? '显示信息流' : '隐藏信息流'

  button.dataset.active = String(isFeedHidden)
  button.setAttribute('aria-pressed', String(isFeedHidden))
}

export const feedToggle = defineFeature({
  key: 'hideFeed',

  setup: ({ ctx, onDispose }) => {
    const createButton = (nativeReload: HTMLElement): HTMLElement => {
      const button = nativeReload.cloneNode(true) as HTMLElement

      button.classList.add(TOGGLE_CLASS_NAME)
      button.setAttribute('role', 'button')
      button.setAttribute('tabindex', '0')
      button.setAttribute('aria-label', '切换信息流显示状态')

      renderButtonState(button, FEATURE_DEFAULTS.hideFeed)

      button.addEventListener('click', async () => {
        const currentValue = await getFeatureValue('hideFeed')
        const nextValue = !currentValue

        if (nextValue) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

        await storage.setItem(getFeatureStorageKey('hideFeed'), nextValue)
      })

      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          button.click()
        }
      })

      return button
    }

    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: ANCHOR_SELECTOR,
      append: 'after',
      onMount: (wrapper) => {
        const nativeReload = wrapper.previousElementSibling

        if (!(nativeReload instanceof HTMLElement)) {
          throw new Error('[feedToggle] native reload button is unavailable')
        }

        wrapper.classList.add(TOGGLE_WRAPPER_CLASS_NAME)

        const button = createButton(nativeReload)

        wrapper.append(button)

        void getFeatureValue('hideFeed').then((hidden) => renderButtonState(button, hidden))

        return button
      },
    })

    ui.autoMount()

    const stopWatchingFeed = watchFeatureValue('hideFeed', (hidden) => {
      const button = ui.mounted

      if (button instanceof HTMLElement) renderButtonState(button, hidden)
    })

    onDispose(() => {
      ui.remove()
      stopWatchingFeed()
    })
  },
})
