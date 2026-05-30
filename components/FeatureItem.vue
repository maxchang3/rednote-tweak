<script lang="ts" setup>
defineProps<{
  featureKey: string
  modelValue: boolean
  title: string
  description?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <div class="item-card">
    <div class="min-w-0 flex-1">
      <Label class="block leading-tight" :for="featureKey">
        {{ title }}
      </Label>
      <p v-if="description" class="mt-1 text-xs leading-4 text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <Switch
      :id="featureKey"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
