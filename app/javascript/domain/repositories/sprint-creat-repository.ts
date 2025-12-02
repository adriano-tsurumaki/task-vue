import type { Board, Column } from '../model/entity/board'
import type {
  SprintCreationBoardView,
  SprintCreationDetailView,
} from '../model/view/sprint-creation-view'

export interface SprintCreationRepository {
  createSprint(sprint: SprintCreationDetailView, boardId: number): Promise<number>
  createBoardWithColumns(board: SprintCreationBoardView): Promise<number>
  getBoards(): Promise<Board[]>
  getBoardColumns(boardId: number): Promise<Column[]>
}
