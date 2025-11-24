import type { SprintBoardView } from '@domain/model/view/sprint-board-view'

export interface SprintBoardRepository {
  getSprintBoardBySprintId(sprintId: number): Promise<SprintBoardView>
}
