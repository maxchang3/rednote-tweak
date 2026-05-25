<script lang="ts" setup>
const props = defineProps<{
  url?: string
}>()

const open = ref(false)

const [useIntlSearch] = useFeature('useIntlSearch')
const [skipIntlAlert] = useStoredValue<boolean>(STORAGE_KEY_SKIP_INTL_ALERT, false)

const { t } = useI18n()

watch(
  () => props.url,
  (url) => {
    if (isIntlDomain(url) && !skipIntlAlert.value) {
      open.value = true
    }
  },
  { immediate: true },
)

const handleConfirm = () => {
  useIntlSearch.value = true
  skipIntlAlert.value = true
  open.value = false
}

const handleSkip = () => {
  skipIntlAlert.value = true
  open.value = false
}
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ t('intlSearchAlert.title') }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ t('intlSearchAlert.description') }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="handleSkip">
          {{ t('intlSearchAlert.noRemind') }}
        </AlertDialogCancel>
        <AlertDialogAction @click="handleConfirm">
          {{ t('intlSearchAlert.confirm') }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
