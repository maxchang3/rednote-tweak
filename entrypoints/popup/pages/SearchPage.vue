<script lang="ts" setup>
import { SearchIcon } from 'lucide-vue-next'

const keyword = shallowRef('')
const searchInputRef = useTemplateRef<{ focus: () => void }>('searchInput')

const submitSearch = async () => {
  const nextKeyword = keyword.value.trim()

  if (!nextKeyword) return

  await browser.tabs.create({
    url: buildXiaohongshuSearchUrl(nextKeyword),
  })
}

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
</template>
