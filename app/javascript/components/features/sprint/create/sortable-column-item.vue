<script setup lang="ts">
import { GripVertical } from 'lucide-vue-next'
import draggable from 'vuedraggable'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { Item, ItemFooter, ItemHeader } from '@ui/item'
import { computed } from 'vue'
import type { SprintCreationColumnView } from '@/domain/model/view/sprint-creation-view'

interface DragEndEvent {
  newDraggableIndex: number
  newIndex: number
  oldDraggableIndex: number
  oldIndex: number
}

const props = defineProps<{
  modelValue: SprintCreationColumnView[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SprintCreationColumnView[]): void
}>()

const availableStatuses = ['to_do', 'in_progress', 'review', 'in_review', 'done', 'blocked']

const columns = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function toggleStatusForColumn(columnId: number, status: string) {
  const column = columns.value.find((c) => c.key === columnId)
  if (!column) return

  if (column.statuses.includes(status)) {
    column.statuses = column.statuses.filter((s) => s !== status)
  } else {
    column.statuses = [...column.statuses, status]
  }
}

function updateColumnTitle(columnId: number, title: string) {
  const column = columns.value.find((c) => c.key === columnId)
  if (column) column.title = title
}

function updateColumnWipLimit(columnId: number, wipLimit: number | undefined) {
  const column = columns.value.find((c) => c.key === columnId)
  if (column) column.wipLimit = wipLimit
}

const dragOptions = computed(() => ({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

function addColumn() {
  const nextOrder =
    columns.value.length > 0 ? Math.max(...columns.value.map((c) => c.order)) + 1 : 1

  const tempId = columns.value.length > 0 ? Math.max(...columns.value.map((c) => c.key)) + 1 : 1

  columns.value.push({
    key: tempId,
    title: 'New column',
    wipLimit: undefined,
    order: nextOrder,
    statuses: [],
  })
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <p class="text-slate-500 flex items-center gap-1">Columns & status mapping</p>
      <Button type="button" variant="outline" size="lg" @click="addColumn"> + Add column </Button>
    </div>
    <draggable
      v-model="columns"
      item-key="tempId"
      tag="div"
      class="list-group flex flex-col gap-2"
      v-bind="dragOptions"
      @end="
        (e: DragEndEvent) => {
          if (e.oldIndex === e.newIndex) return

          columns[e.newIndex]!.order = e.oldIndex + 1
          columns[e.oldIndex]!.order = e.newIndex + 1

          const [movedItem] = columns.splice(e.oldIndex, 1)

          if (!movedItem) return

          columns.splice(e.newIndex, 0, { ...movedItem, order: e.newIndex + 1 })
        }
      "
    >
      <template #item="{ element: column }">
        <div class="draggable-wrapper" :key="column.tempId">
          <Item variant="outline">
            <ItemHeader>
              <button
                type="button"
                class="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
                aria-label="Drag to reorder"
              >
                <GripVertical class="h-4 w-4 text-muted-foreground" />
              </button>
              <div class="flex-1">
                <Input
                  :model-value="column.title"
                  type="text"
                  :placeholder="column.title"
                  @update:model-value="updateColumnTitle(column.tempId, $event as string)"
                />
              </div>
              <div class="w-32">
                <Input
                  :model-value="column.wipLimit"
                  type="number"
                  min="0"
                  placeholder="WIP"
                  @update:model-value="
                    updateColumnWipLimit(column.tempId, $event === '' ? undefined : Number($event))
                  "
                />
              </div>
            </ItemHeader>

            <ItemFooter>
              <div class="space-y-1">
                <p class="text-xs text-slate-500">Statuses that will be shown in this column:</p>
                <div class="flex flex-wrap gap-1.5">
                  <Button
                    v-for="status in availableStatuses"
                    :key="status"
                    type="button"
                    size="sm"
                    :variant="column.statuses.includes(status) ? 'default' : 'outline'"
                    @click="toggleStatusForColumn(column.tempId, status)"
                  >
                    {{ status }}
                  </Button>
                </div>
              </div>
            </ItemFooter>
          </Item>
        </div>
      </template>
    </draggable>
  </div>
</template>
