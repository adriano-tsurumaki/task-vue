<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { Label } from '@ui/label'
import { Input } from '@ui/input'
import { Textarea } from '@ui/textarea'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  id: string
  defaultValue?: string | number
  modelValue?: string | number
  type: string | 'textarea'
  label: string
  placeholder?: string
  required?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <div class="space-y-1">
    <Label :for="id" class="text-sm text-slate-400 gap-1">
      <span>{{ label }}</span>
      <span v-if="required" class="text-rose-400">*</span>
    </Label>
    <Input
      v-if="type !== 'textarea'"
      :id="id"
      v-model="modelValue"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
    />
    <Textarea v-else :id="id" v-model="modelValue" v-bind="$attrs" :placeholder="placeholder" />
  </div>
</template>
