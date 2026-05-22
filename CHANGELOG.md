# Changelog

## [2.0.2](https://github.com/maxchang3/rednote-search/compare/v2.0.1...v2.0.2) (2026-05-22)


### Bug Fixes

* **popup/searchPage:** resolve width inconsistency between Chrome and Firefox ([a4e81dd](https://github.com/maxchang3/rednote-search/commit/a4e81dd5e3f299e53f948d07bd80fe6d3c909c67))

## [2.0.1](https://github.com/maxchang3/rednote-search/compare/v2.0.0...v2.0.1) (2026-05-22)


### Bug Fixes

* **hideFeed:** refine condition for toggling root class ([4fb8562](https://github.com/maxchang3/rednote-search/commit/4fb85628d99a56175f5882d8f0ec9166c7d2e73a))

## [2.0.0](https://github.com/maxchang3/rednote-search/compare/v1.0.2...v2.0.0) (2026-05-22)

### ⚠ BREAKING CHANGES

- v2 implementation overhaul

### Features

- add context menu for searching selected text ([a8d1764](https://github.com/maxchang3/rednote-search/commit/a8d1764160db7706de3b45a7d7543e925d6deaa2))
- add feature to hide AI Chat button in sidebar ([37010d9](https://github.com/maxchang3/rednote-search/commit/37010d959b18c251f7b942f879be5dbc338bc2fd))
- add popup search page ([b3f81bb](https://github.com/maxchang3/rednote-search/commit/b3f81bbb0f1baf91beec5dfac3217d755ac0cc77))
- **popup:** grid layout for sidebar features; remove sidebar descriptions; update locales ([bb88bc1](https://github.com/maxchang3/rednote-search/commit/bb88bc1aefa236810ba78ea767b2020bf27373c0))
- v2 implementation overhaul ([f756d00](https://github.com/maxchang3/rednote-search/commit/f756d00ac149f4d27e67f8c2c5f1798d4a105f1a))
  - **Architecture**: Introduced a brand-new project structure utilizing Vue, UnoCSS, shadcn-vue, and vite-plus.
  - **i18n**: Added dynamic language switching via vue-i18n, resolving #2. (Special thanks to @ChouChiu for the initial implementation in #4!)
  - **Mobile**: Fixed mobile layout and responsiveness.
- 适配新版样式（点点 AI） ([92146f0](https://github.com/maxchang3/rednote-search/commit/92146f01070680aac76904e3b5d6aedc9b7bc9e5))

### Bug Fixes

- **context-menu:** use browser i18n for menu title ([e83df68](https://github.com/maxchang3/rednote-search/commit/e83df68a6aaac206969a42aca43e9b649e72ebc8))

## [1.0.1](https://github.com/maxchang3/rednote-search/compare/v1.0.0...v1.0.1) (2026-03-24)

### Bug Fixes

- **i18n:** refine description for hideFeed feature ([4e74e1b](https://github.com/maxchang3/rednote-search/commit/4e74e1b62629c065e1a4caf69904651c3757dd4f))
- **i18n:** update extDescription ([1cba024](https://github.com/maxchang3/rednote-search/commit/1cba024119a5db38b8ad7d6ac63ea413927ff115))
- **i18n:** update reset button text ([d446efe](https://github.com/maxchang3/rednote-search/commit/d446efef52f89b3116c8bfcd8b3bb5522b567b49))

## 1.0.0 (2026-03-19)

### Features

- add extension i18n support ([71757d0](https://github.com/maxchang3/rednote-search/commit/71757d0c8e9cff67ee7d31078e51e179a3de5498))
- add feature authoring guidelines to AGENTS.md ([ebf3ab1](https://github.com/maxchang3/rednote-search/commit/ebf3ab1719dcb6b504b116665ce1c36242b2c131))
- add hide livelist navigation feature ([c789c24](https://github.com/maxchang3/rednote-search/commit/c789c24ce0eb1f1f79e64455623f19d3289e30fc))
- add hide search suggestions feature ([24df897](https://github.com/maxchang3/rednote-search/commit/24df8975e0bf722d28680cfdbcf13aca17e9507a))
- add hide sidebar nav and refactor feature settings model ([09ef5df](https://github.com/maxchang3/rednote-search/commit/09ef5dfa79147c1f30346facdd33d5aaeccdfdb6))
- add popup color tokens and dark mode ([68966f2](https://github.com/maxchang3/rednote-search/commit/68966f2d144d8b90074fe3533d4a0f7890cd8fed))
- add routing and UI features ([959d27a](https://github.com/maxchang3/rednote-search/commit/959d27aab05ab6048994a695abfb2b5b74618994))
- add skills and create AGENTS.md ([e54400a](https://github.com/maxchang3/rednote-search/commit/e54400aaf0493de56a37428650ffeba7b3f0ae42))
- add support for title and description keys in i18n ally usage matching ([67bc1a7](https://github.com/maxchang3/rednote-search/commit/67bc1a765f75f8c4de4eadc4da1dc27d637c0783))
- hide notification badge ([84ffe1e](https://github.com/maxchang3/rednote-search/commit/84ffe1e50c2593770e83744b69edb217177641ce))
- implement feature management and UI enhancements ([c4d5063](https://github.com/maxchang3/rednote-search/commit/c4d5063ec36333ea22adfc326b6a894ca064d0b8))

### Bug Fixes

- only hide search suggestions with header ([f08adcf](https://github.com/maxchang3/rednote-search/commit/f08adcf06155892e5b48b021710ba801b35d1ef4))
- typo ([af68cc8](https://github.com/maxchang3/rednote-search/commit/af68cc83f80707631435771f749cfd11b0cac3ce))
