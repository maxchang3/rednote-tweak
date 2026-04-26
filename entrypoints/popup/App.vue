<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'

const { syncedLocale } = useLocale()
</script>

<template>
  <div>
    <div>
      <select v-model="syncedLocale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
          {{ LOCALE_NATIVE_NAMES[locale as I18nLocales] }}
        </option>
      </select>
    </div>
    <div class="app-content">
      <HelloWorld msg="WXT + Vue" />
    </div>
  </div>
</template>
