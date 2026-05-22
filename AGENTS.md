# Project Overview

[**小红搜 — RedNote Search**](https://github.com/maxchang3/rednote-search) is a cross-browser extension (Chrome, Firefox, Edge) that turns [Xiaohongshu (小红书)](https://www.xiaohongshu.com) into a search-first experience. It hides distracting feeds, sidebar navigation, and search suggestions — all configurable from the popup. Built with **WXT** on top of Vite.

## Tech Stack

- **Framework:** [WXT](https://wxt.dev) — browser extension framework with Vite under the hood
- **UI (Popup):** Vue 3 Composition API + `<script setup>` + TypeScript
- **Components:** [shadcn-vue](https://www.shadcn-vue.com/) (New York style) + [reka-ui](https://reka-ui.com/) + [Lucide](https://lucide.dev/) icons
- **Styling:** [UnoCSS](https://unocss.dev/) (Preset Wind 3) + [unocss-preset-shadcn](https://github.com/unocss-community/unocss-preset-shadcn)
- **State:** [wxt/storage](https://wxt.dev/guide/essentials/storage.html) wrapped in Vue composables (`useStoredValue`, `useFeatureState`)
- **i18n:** [vue-i18n](https://vue-i18n.intlify.dev/) with JSON locale files in `assets/locales/` and extension manifest messages in `public/_locales/`
- **Tooling:** [Vite+](https://vite.plus/) (`vp`) — see section below
- **Package Manager:** pnpm (via Vite+ `vp add` / `vp install`)

## Data Flow

```
Popup (Vue) ──write──> wxt/storage <──watch── Content Script
                          │
                    Feature toggle changes
                    trigger onFeatureChange
                    callbacks that apply/remove
                    DOM mutations
```

## Conventions

- **Auto-imports:** Vue APIs (`ref`, `computed`, `watch`, etc.) are auto-imported by `@wxt-dev/module-vue`. Shared modules in `shared/` are auto-imported via `imports.dirs`. Components in `components/` are auto-imported via `unplugin-vue-components`. No manual imports needed in `.vue` files.
- **Adding a feature:** Define it in `shared/const.ts` under a `FEATURE_GROUPS` entry, create an impl file in `entrypoints/rednote.content/impl/`, export it from `impl/index.ts`, add it to the `featureRegistrations` array in `features.ts`, and add i18n keys to `assets/locales/*.json`.

## Build & Development

```sh
vp install          # Install dependencies
vp run dev          # Start WXT dev server (Chromium)
vp run dev:firefox  # Start WXT dev server (Firefox)
vp run build        # Production build
vp run compile      # Type-check with vue-tsc
```

Use `vp check` to run format, lint, and type checks together.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, but it invokes Vite through `vp dev` and `vp build`.

## Vite+ Workflow

`vp` is a global binary that handles the full development lifecycle. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- staged - Run linters on staged files
- install (`i`) - Install dependencies
- env - Manage Node.js versions

### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt - Format code
- test - Run tests

### Execute

- run - Run monorepo tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as pnpm, npm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- list (`ls`) - List installed packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

### Maintain

- upgrade - Update `vp` itself to the latest version

These commands map to their corresponding tools. For example, `vp dev --port 3000` runs Vite's dev server and works the same as Vite. `vp test` runs JavaScript tests through the bundled Vitest. The version of all tools can be checked using `vp --version`. This is useful when researching documentation, features, and bugs.

## Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ built-in commands (`vp dev`, `vp build`, `vp test`, etc.) always run the Vite+ built-in tool, not any `package.json` script of the same name. To run a custom script that shares a name with a built-in command, use `vp run <script>`. For example, if you have a custom `dev` script that runs multiple services concurrently, run it with `vp run dev`, not `vp dev` (which always starts Vite's dev server).
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

## CI Integration

For GitHub Actions, consider using [`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) to replace separate `actions/setup-node`, package-manager setup, cache, and install steps with a single action.

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    cache: true
- run: vp check
- run: vp test
```

## Review Checklist for Agents

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to validate changes.
<!--VITE PLUS END-->
