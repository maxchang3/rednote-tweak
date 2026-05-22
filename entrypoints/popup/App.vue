<script lang="ts" setup>
import FeaturesPage from './pages/FeaturesPage.vue'

type PopupPage = 'features'

const currentPage = shallowRef<PopupPage>('features')
const pageMap = {
  features: FeaturesPage,
} as const

const currentPageComponent = computed(() => pageMap[currentPage.value])

const { actualLocale } = useLocale()
</script>

<template>
  <div>
    <PopupHeader v-model="actualLocale" />

    <component :is="currentPageComponent" />
  </div>
</template>
