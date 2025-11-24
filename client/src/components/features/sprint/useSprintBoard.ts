import { inject, onMounted, ref } from 'vue'
import type { SprintBoardView } from '@domain/model/view/sprint-board-view'
import type { SprintBoardRepository } from '@domain/repositories/sprint-board-repository'
import { SPRINT_BOARD_REPO } from '@/infrastructure/factory/sprint-board-repo-factory'

export function useSprintBoard(sprintId: number) {
  const repo = inject<SprintBoardRepository>(SPRINT_BOARD_REPO)

  if (!repo) {
    throw new Error('SprintBoardRepository not provided')
  }

  const sprintBoard = ref<SprintBoardView | null>(null)
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)

  const loadSprintBoard = async () => {
    try {
      isLoading.value = true
      error.value = null
      sprintBoard.value = await repo.getSprintBoardBySprintId(sprintId)
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadSprintBoard)

  return {
    sprintBoard,
    isLoading,
    error,
    reload: loadSprintBoard,
  }
}
