import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'

const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
const apply = () => document.documentElement.classList.toggle('dark', darkModePreference.matches)
apply()
darkModePreference.addEventListener('change', apply)

createApp(App).use(i18n).mount('#app')
