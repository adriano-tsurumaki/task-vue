<script setup lang="ts" generic="T">
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { Button } from '../button'
import { cn } from '@lib/utils'

interface SegmentedOption<T> {
  label: string
  value: T
}

const props = defineProps<{
  modelValue: T
  options: SegmentedOption<T>[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: T]
  change: [value: T]
}>()

const currentValue = computed<T>({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  },
})

const sliderStyle = ref<{ width: string; transform: string }>({
  width: '0px',
  transform: 'translateX(0px)',
})

const btnRefs = ref<Array<InstanceType<typeof Button> | null>>([])

const setBtnRef = (el: InstanceType<typeof Button> | null, index: number) => {
  btnRefs.value[index] = el
}

const getDomEl = (comp: InstanceType<typeof Button> | null): HTMLElement | null => {
  return comp?.$el ?? null
}

const updateSlider = () => {
  const index = props.options.findIndex((o) => o.value === currentValue.value)
  if (index === -1) return

  const targetComp = btnRefs.value[index]
  if (!targetComp) return

  const target = getDomEl(targetComp)
  if (!target || !target.parentElement) return

  const rect = target.getBoundingClientRect()
  const parentRect = target.parentElement.getBoundingClientRect()

  sliderStyle.value = {
    width: `${rect.width}px`,
    // tweak the -4px if your padding/border changes
    transform: `translateX(${rect.left - parentRect.left - 4}px)`,
  }
}

onMounted(() => {
  nextTick(updateSlider)
})

watch(
  () => props.modelValue,
  () => nextTick(updateSlider),
)

watch(
  () => props.options,
  () => nextTick(updateSlider),
  { deep: true },
)
</script>

<template>
  <div class="relative inline-flex items-center rounded-xl border p-1 gap-2">
    <!-- Sliding Background -->
    <div
      class="absolute top-1 bottom-1 bg-primary rounded-md transition-all duration-200 ease-out z-0"
      :style="sliderStyle"
    />

    <!-- Buttons -->
    <Button
      v-for="(option, index) in options"
      :key="String(option.value)"
      :ref="(el) => setBtnRef(el as InstanceType<typeof Button> | null, index)"
      variant="outline"
      :class="
        cn(
          'bg-transparent border-0 z-10',
          option.value === currentValue
            ? 'text-white font-medium hover:bg-primary hover:text-white'
            : 'text-primary',
        )
      "
      @click="currentValue = option.value"
    >
      {{ option.label }}
    </Button>

    <slot />
  </div>
</template>
