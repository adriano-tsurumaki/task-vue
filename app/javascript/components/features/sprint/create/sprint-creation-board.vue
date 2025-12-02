<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card'
import { KanbanSquare } from 'lucide-vue-next'
import SegmentedToggle from '@/components/ui/segmented-toggle/SegmentedToggle.vue'
import InputForm from './sprint-creation-forms.vue'
import SortableColumnItem from './sortable-column-item.vue'
import { computed, inject, onMounted, ref, watch } from 'vue'
import type { SprintCreationBoardView } from '@/domain/model/view/sprint-creation-view'

import { SPRINT_CREAT_REPO } from '@infra/factory/sprint-creat-repo-factory'
import type { SprintCreationRepository } from '@domain/repositories/sprint-creat-repository'
import type { Board, Column } from '@domain/model/entity/board'
import Item from '@/components/ui/item/Item.vue'
import ItemHeader from '@/components/ui/item/ItemHeader.vue'
import ItemContent from '@/components/ui/item/ItemContent.vue'

const sprintRepo = inject<SprintCreationRepository | null>(SPRINT_CREAT_REPO, null)

const props = defineProps<{
  modelValue: SprintCreationBoardView
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SprintCreationBoardView): void
}>()

const board = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
const selectedBoardId = ref<number | undefined>(undefined)

const boards = ref<Board[]>([])

const selectedBoard = computed(
  () => boards.value.find((b) => b.id === selectedBoardId.value) ?? null,
)

const isLoadingBoards = ref(false)

const existingBoardColumns = ref<Column[]>([])

onMounted(async () => {
  if (!sprintRepo) return
  try {
    isLoadingBoards.value = true
    boards.value = await sprintRepo.getBoards()

    const firstBoard = boards.value[0]
    if (firstBoard?.id !== undefined) {
      selectedBoardId.value = firstBoard.id
      await loadExistingBoardColumns()
    }
  } finally {
    isLoadingBoards.value = false
  }
})

watch(selectedBoardId, async () => {
  await loadExistingBoardColumns()
})

async function loadExistingBoardColumns() {
  if (!sprintRepo || !selectedBoardId.value) {
    existingBoardColumns.value = []
    return
  }

  try {
    existingBoardColumns.value = await sprintRepo.getBoardColumns(selectedBoardId.value)
  } catch (error) {
    console.error('Failed to load board columns:', error)
    existingBoardColumns.value = []
  }
}
</script>

<template>
  <Card class="bg-card shadow-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base flex items-center gap-2">
        <KanbanSquare class="h-4 w-4 text-sky-400" />
        Board configuration
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4 text-sm">
      <SegmentedToggle
        :model-value="board.mode"
        @update:model-value="(val) => (board.mode = val as 'existing-board' | 'new-board')"
        :options="[
          { label: 'Use existing board', value: 'existing-board' },
          { label: 'Create new board for this sprint', value: 'new-board' },
        ]"
      />

      <div v-if="board.mode === 'existing-board'" class="space-y-3">
        <Select v-model="selectedBoardId" :disabled="boards.length === 0">
          <SelectTrigger>
            <SelectValue
              :placeholder="boards.length === 0 ? 'No boards available' : 'Select board'"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-if="isLoadingBoards" disabled value="loading">
              Loading boards...
            </SelectItem>
            <template v-for="board in boards" :key="board.id">
              <SelectItem v-if="board.id !== undefined" :value="board.id">
                {{ board.name }}
              </SelectItem>
            </template>
          </SelectContent>
        </Select>

        <Item v-if="selectedBoard" variant="outline">
          <ItemHeader class="flex-col items-start">
            <p class="font-semibold">
              {{ selectedBoard.name }}
            </p>
            <p v-if="selectedBoard.description" class="text-sm">
              {{ selectedBoard.description }}
            </p>
          </ItemHeader>
          <ItemContent>
            {{ existingBoardColumns.length }} column(s) configured for this board.
          </ItemContent>
        </Item>
      </div>

      <!-- New board -->
      <div v-else class="space-y-3">
        <InputForm
          id="board-name"
          v-model="board.name"
          type="text"
          label="Board name"
          placeholder="Checkout v2 – Sprint Board"
          required
        />

        <InputForm
          id="new-board-description"
          v-model="board.description"
          type="textarea"
          label="Board description"
          placeholder="Board used by the Checkout squad for Sprints 12–15."
        />

        <SortableColumnItem :model-value="board.columns" />
      </div>
    </CardContent>
  </Card>
</template>
