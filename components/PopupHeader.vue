<script lang="ts" setup>
const localeModel = defineModel<string>()

const { t } = useI18n()
</script>

<template>
  <header class="flex items-center justify-between gap-3">
    <h1 class="m-0 text-lg leading-tight font-semibold">
      {{ t('title') }}
    </h1>
    <LocaleSelect v-model="localeModel" />
  </header>
</template>
