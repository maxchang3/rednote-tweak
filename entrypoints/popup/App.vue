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
const { actualLocale } = useLocale()

const currentPage = shallowRef<PopupPage>('features')

const useIntlSearchKey = getFeatureStorageKey('useIntlSearch')
const { state: useIntlSearch } = useStoredValue<boolean>(
  useIntlSearchKey,
  FEATURE_DEFAULTS['useIntlSearch'],
)
const { state: skipIntlAlert } = useStoredValue<boolean>(STORAGE_KEY_SKIP_INTL_ALERT, false)

const showIntlAlert = ref(false)

onMounted(async () => {
  const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true })

  currentPage.value = activeTab?.url && !isAllowedURL(activeTab.url) ? 'search' : 'features'

  if (isIntlDomain(activeTab?.url) && !skipIntlAlert.value) {
    showIntlAlert.value = true
  }
})

function handleIntlConfirm() {
  useIntlSearch.value = true
  skipIntlAlert.value = true
  showIntlAlert.value = false
}

function handleIntlSkip() {
  skipIntlAlert.value = true
  showIntlAlert.value = false
}

function togglePage() {
  currentPage.value = currentPage.value === 'features' ? 'search' : 'features'
}

const currentPageConfig = computed(() => popupPages[currentPage.value])
const currentPageComponent = computed(() => currentPageConfig.value.component)
const currentPageTitle = computed(() => t(currentPageConfig.value.titleKey))
</script>

<template>
  <div>
    <PopupHeader v-model="actualLocale" :title="currentPageTitle" @action="togglePage" />

    <IntlSearchAlert
      v-model:open="showIntlAlert"
      @confirm="handleIntlConfirm"
      @skip="handleIntlSkip"
    />

    <component :is="currentPageComponent" />
  </div>
</template>
