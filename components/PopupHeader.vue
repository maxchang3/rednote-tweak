<script lang="ts" setup>
import { ArrowLeftRightIcon } from '@lucide/vue'

defineProps<{
  title: string
}>()

defineEmits<{
  action: []
}>()

const localeModel = defineModel<string>()
</script>

<template>
  <header class="flex items-center justify-between gap-3">
    <div class="flex min-w-0 items-center gap-2">
      <h1 class="m-0 truncate text-lg leading-tight font-semibold">
        {{ title }}
      </h1>

      <Button variant="ghost" aria-label="Toggle popup page" @click="$emit('action')">
        <ArrowLeftRightIcon :size="16" data-icon="inline-start" aria-hidden="true" />
      </Button>
    </div>
    <LocaleSelect v-model="localeModel" />
  </header>
</template>
