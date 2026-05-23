import './style.css'
import { initFeatures } from './features'

export default defineContentScript({
  matches: ['https://www.xiaohongshu.com/*', 'https://www.rednote.com/*'],
  runAt: 'document_start',
  async main(ctx) {
    await initFeatures(ctx)
  },
})
