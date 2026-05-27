import { presetWind } from '@unocss/preset-wind3'
import { defineConfig } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetWind(),
    presetAnimations(),
    presetShadcn(
      {
        color: 'red',
      },
      {
        // If you are using reka ui.
        componentLibrary: 'reka',
      },
    ),
  ],
  // Project shortcuts for repeated utility groups
  shortcuts: {
    'item-card':
      'flex items-center justify-between gap-3 border rounded-xl bg-muted/50 px-3 py-2.5',
  },
  // By default, `.ts` and `.js` files are NOT extracted.
  // If you want to extract them, use the following configuration.
  // It's necessary to add the following configuration if you use shadcn-vue or shadcn-svelte.
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '(components|src)/**/*.{js,ts}',
      ],
    },
  },
  transformers: [transformerDirectives()],
})
