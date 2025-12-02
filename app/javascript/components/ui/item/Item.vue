<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { ref, type HTMLAttributes } from 'vue'
import type { ItemVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@lib/utils'
import { itemVariants } from '.'

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      class?: HTMLAttributes['class']
      variant?: ItemVariants['variant']
      size?: ItemVariants['size']
    }
  >(),
  {
    as: 'div',
  },
)

const itemRef = ref<HTMLElement | null>(null)

defineExpose({
  itemRef,
})
</script>

<template>
  <Primitive
    ref="itemRef"
    data-slot="item"
    :as="as"
    :as-child="asChild"
    :class="cn(itemVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
