import type { Board, Column } from '@/domain/model/entity/board'
import type { SprintCreationRepository } from '@/domain/repositories/sprint-creat-repository'
import { db } from './db'
import type {
  SprintCreationBoardView,
  SprintCreationDetailView,
} from '@/domain/model/view/sprint-creation-view'

export default class SprintCreationRepositoryDexie implements SprintCreationRepository {
  async createSprint(sprint: SprintCreationDetailView, boardId: number): Promise<number> {
    const id = await db.sprints.add({
      boardId,
      name: sprint.name,
      goal: sprint.goal,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      capacityHours: sprint.capacityHours,
      velocityForecast: sprint.velocityForecast,
      isActive: sprint.isActive,
      createdAt: new Date().toUTCString(),
    })

    if (!id) {
      throw new Error('Failed to create sprint')
    }

    return id
  }

  async createBoardWithColumns(board: SprintCreationBoardView): Promise<number> {
    const id = await db.boards.add({
      archived: false,
      createdAt: new Date().toUTCString(),
      name: board.name,
      description: board.description,
      updatedAt: new Date().toUTCString(),
    })

    if (!id) throw new Error('Failed to create a new board')

    board.columns.forEach(async (x) => {
      await db.columns.add({
        boardId: id,
        order: x.order,
        title: x.title,
        wipLimit: x.wipLimit,
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
      })
    })

    return id
  }

  getBoards(): Promise<Board[]> {
    // TODO: I have to test if there any board archived passing this filter
    return db.boards.filter((x) => !x.archived).toArray()
  }

  getBoardColumns(boardId: number): Promise<Column[]> {
    return db.columns.where('boardId').equals(boardId).toArray()
  }
}
