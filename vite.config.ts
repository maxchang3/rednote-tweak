import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    semi: false,
    singleQuote: true,
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
    rules: {
      'eslint/func-style': ['error', 'expression'],
    },
  },
})
