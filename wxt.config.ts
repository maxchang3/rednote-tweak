import { defineConfig, type WxtViteConfig } from 'wxt'
import Components from 'unplugin-vue-components/vite'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue', '@wxt-dev/auto-icons', 'wxt-module-safari-xcode'],
  manifest: {
    name: '__MSG_extName__',
    description: '__MSG_extDescription__',
    default_locale: 'en',
    permissions: ['storage', 'contextMenus', 'tabs'],
    host_permissions: ['https://www.xiaohongshu.com/*', 'https://www.rednote.com/*'],
    browser_specific_settings: {
      gecko: {
        id: 'rednote-search@maxchang.me',
        data_collection_permissions: {
          required: ['none'],
        },
      },
    },
  },
  safariXcode: {
    projectName: '小红 RedNote Tweak',
    appCategory: 'public.app-category.productivity',
    bundleIdentifier: 'me.maxchang.rednote-tweak.extension',
  },
  autoIcons: {
    baseIconPath: 'assets/icon.png',
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
