import type { IBoardRepository } from '@/infrastructure/interface/board-repository'
import type { Board } from '@/domain/model/entity/board'
import { db } from '@infra/dexie/db'

export class BoardRepository implements IBoardRepository {
  async getAll(): Promise<Board[]> {
    return db.boards.toArray()
  }

  async getById(id: number): Promise<Board | null> {
    const board = await db.boards.get(id)
    return board ?? null
  }
}
