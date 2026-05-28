<script lang="ts" setup>
import { SearchIcon } from '@lucide/vue'
import laptop from '~/assets/laptop.svg'
import laptop2 from '~/assets/laptop_2.svg'
import laptop3 from '~/assets/laptop_3.svg'

const keyword = shallowRef('')
const searchInputRef = useTemplateRef<{ focus: () => void }>('searchInput')

const [useIntlSearch] = useFeature('useIntlSearch')

const isSearching = ref(false)

const submitSearch = async () => {
  const nextKeyword = keyword.value.trim()

  if (!nextKeyword) return

  isSearching.value = true
  await openSearchTab(nextKeyword, useIntlSearch.value)
}

const frames = [laptop, laptop2]
const currentFrame = ref(0)

const tickFrame = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  if (val) {
    currentFrame.value = (currentFrame.value + 1) % frames.length
  } else {
    currentFrame.value = 0
  }
}

watch(keyword, (val) => {
  if (!val) currentFrame.value = 0
})

const laptopSrc = computed(() => (isSearching.value ? laptop3 : frames[currentFrame.value]))

onMounted(() => {
  searchInputRef.value?.focus()
})
</script>

<template>
  <section class="flex flex-1 items-center justify-center pt-6">
    <form class="flex w-full items-center gap-2" @submit.prevent="submitSearch">
      <Input
        ref="searchInput"
        v-model="keyword"
        type="search"
        :placeholder="$t('searchPage.placeholder')"
        class="h-10 min-w-0 flex-1 rounded-2xl"
        @input="tickFrame"
      />

      <Button
        type="submit"
        variant="default"
        size="icon-lg"
        class="shrink-0 rounded-full"
        :disabled="!keyword.trim()"
        aria-label="Search on Xiaohongshu"
      >
        <SearchIcon :size="18" data-icon="inline-start" aria-hidden="true" />
      </Button>
    </form>
  </section>
  <header class="pt-4 flex justify-center">
    <img :src="laptopSrc" class="w-20 pointer-events-none select-none" />
  </header>
</template>
