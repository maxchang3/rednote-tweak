<script lang="ts" setup>
const { t } = useI18n()
const { featureMap, isReady } = useFeatureMap()
</script>

<template>
  <div v-if="!isReady" class="flex items-center justify-center p-6">
    <Spinner />
  </div>

  <section v-else class="flex flex-col">
    <section v-for="group in FEATURE_GROUPS" :key="group.groupId" class="flex flex-col gap-2">
      <h3 class="text-sm font-semibold text-muted-foreground">
        {{ t(`groups.${group.groupId}`) }}
      </h3>

      <div
        :class="
          group.groupId === 'general' ? 'flex flex-col gap-1 pb-2' : 'grid grid-cols-2 gap-2 pb-2'
        "
      >
        <FeatureItem
          v-for="feature in group.features"
          :key="feature.id"
          :feature-key="feature.id"
          :title="t(`features.${feature.id}.title`)"
          :description="
            group.groupId === 'general' ? t(`features.${feature.id}.description`) : undefined
          "
          v-model="featureMap[feature.id].value"
        />
      </div>
    </section>
  </section>
</template>
