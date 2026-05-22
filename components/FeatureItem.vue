<script lang="ts" setup>
defineProps<{
  featureKey: string
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { t } = useI18n()
</script>

<template>
  <div class="item-card">
    <div class="min-w-0 flex-1">
      <Label class="block leading-tight" :for="featureKey">
        {{ t(`features.${featureKey}.title`) }}
      </Label>
      <p class="mt-1 text-xs leading-4 text-muted-foreground">
        {{ t(`features.${featureKey}.description`) }}
      </p>
    </div>
    <Switch
      :id="featureKey"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
