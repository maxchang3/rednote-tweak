import { defineConfig, type WxtViteConfig } from 'wxt'
import Components from 'unplugin-vue-components/vite'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: '__MSG_extName__',
    description: '__MSG_extDescription__',
    default_locale: 'zh_CN',
    permissions: ['storage', 'contextMenus'],
    host_permissions: ['https://www.xiaohongshu.com/*'],
    browser_specific_settings: {
      gecko: {
        id: 'rednote-search@maxchang.me',
        data_collection_permissions: {
          required: ['none'],
        },
      },
    },
  },
  modules: ['@wxt-dev/module-vue', '@wxt-dev/auto-icons'],
  autoIcons: {
    baseIconPath: 'assets/icon.svg',
  },
  imports: {
    dirs: ['./shared/*'],
    presets: ['vue-i18n'],
    addons: {
      vueTemplate: true,
    },
  },
  vite: () =>
    <WxtViteConfig>{
      plugins: [
        Components({
          dirs: ['components'],
        }),
        // See https://vue-i18n.intlify.dev/guide/advanced/optimization.html
        vueI18n({
          module: 'petite-vue-i18n',
          include: 'assets/locales/*.json',
        }),
        UnoCSS(),
      ],
    },
  webExt: {
    chromiumArgs: ['--user-data-dir=./.wxt/chrome-data'],
  },
})
