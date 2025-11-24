import type { Board } from '@/domain/model/entity/board'

export interface IBoardRepository {
  getAll(): Promise<Board[]>
  getById(id: number): Promise<Board | null>
}
