<script lang="ts" setup>
const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  confirm: []
  skip: []
}>()

const { t } = useI18n()
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
        <AlertDialogCancel @click="emit('skip')">
          {{ t('intlSearchAlert.noRemind') }}
        </AlertDialogCancel>
        <AlertDialogAction @click="emit('confirm')">
          {{ t('intlSearchAlert.confirm') }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
