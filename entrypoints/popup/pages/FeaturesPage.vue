<script lang="ts" setup>
const { t } = useI18n()
const { featureStateMap, isReady } = useFeatureStateMap()
</script>

<template>
  <div v-if="!isReady" class="flex items-center justify-center p-6">
    <Spinner />
  </div>

  <main v-else class="flex flex-col">
    <section v-for="group in FEATURE_GROUPS" :key="group.groupId" class="flex flex-col gap-2">
      <h3 class="text-sm font-semibold text-gray-500">
        {{ t(`groups.${group.groupId}`) }}
      </h3>

      <div class="flex flex-col gap-1 pb-2">
        <FeatureItem
          v-for="feature in group.features"
          :key="feature.id"
          :feature-key="feature.id"
          :title="t(`features.${feature.id}.title`)"
          :description="t(`features.${feature.id}.description`)"
          v-model="featureStateMap[feature.id].value"
        />
      </div>
    </section>
  </main>
</template>
