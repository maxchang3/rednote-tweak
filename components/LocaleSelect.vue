<script lang="ts" setup>
import { LanguagesIcon } from 'lucide-vue-next'

const modelValue = defineModel<string>()
</script>

<template>
  <div class="flex shrink-0 items-center gap-1 text-gray-500">
    <LanguagesIcon class="size-3 shrink-0" aria-hidden="true" />

    <NativeSelect id="locale-select" v-model="modelValue" class="b-none text-sm p-1 cursor-pointer">
      <NativeSelectOption
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ $t('#nativeName', {}, { locale }) }}
      </NativeSelectOption>
    </NativeSelect>
  </div>
</template>
