<script lang="ts" setup>
const extVersion = browser.runtime.getManifest().version
const { t } = useI18n()
</script>

<template>
  <footer class="flex flex-col items-center pt-4 text-xs text-muted-foreground opacity-60">
    <a href="https://github.com/maxchang3/rednote-tweak" target="_blank">
      {{ t('title') }} · v{{ extVersion }}
    </a>
  </footer>
</template>
