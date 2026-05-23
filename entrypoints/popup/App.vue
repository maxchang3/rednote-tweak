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

onMounted(async () => {
  const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true })

  currentPage.value = activeTab?.url && !isXiaohongshuUrl(activeTab.url) ? 'search' : 'features'
})

function togglePage() {
  currentPage.value = currentPage.value === 'features' ? 'search' : 'features'
}

const currentPageConfig = computed(() => popupPages[currentPage.value])
const currentPageComponent = computed(() => currentPageConfig.value.component)
const currentPageTitle = computed(() => t(currentPageConfig.value.titleKey))
</script>

<template>
  <div>
    <PopupHeader v-model="resolvedLocale" :title="currentPageTitle" @action="togglePage" />

    <component :is="currentPageComponent" />
  </div>
</template>
