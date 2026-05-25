<script lang="ts" setup>
import FeaturesPage from './pages/FeaturesPage.vue'
import SearchPage from './pages/SearchPage.vue'

type PopupPage = 'features' | 'search'

const popupPages = {
  features: {
    component: FeaturesPage,
    titleKey: 'popupPages.settings',
  },
  search: {
    component: SearchPage,
    titleKey: 'popupPages.search',
  },
} as const

const { t } = useI18n()
const { resolvedLocale } = useLocale()

const currentPage = shallowRef<PopupPage>('features')
const activeTabUrl = ref<string>()

onMounted(async () => {
  const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true })

  activeTabUrl.value = activeTab.url
  currentPage.value = !isAllowedURL(activeTab.url) ? 'search' : 'features'
})

const togglePage = () => {
  currentPage.value = currentPage.value === 'features' ? 'search' : 'features'
}

const currentPageConfig = computed(() => popupPages[currentPage.value])
const currentPageComponent = computed(() => currentPageConfig.value.component)
const currentPageTitle = computed(() => t(currentPageConfig.value.titleKey))
</script>

<template>
  <div>
    <PopupHeader v-model="resolvedLocale" :title="currentPageTitle" @action="togglePage" />

    <IntlSearchAlert :url="activeTabUrl" />

    <component :is="currentPageComponent" />
  </div>
</template>
