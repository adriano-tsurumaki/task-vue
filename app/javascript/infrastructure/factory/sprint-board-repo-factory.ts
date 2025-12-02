import type { InjectionKey } from 'vue'
import type { SprintBoardRepository } from '@/domain/repositories/sprint-board-repository'
import repoDexie from '@infra/dexie/sprint-board-repository'

export function createSprintBoardRepoFactory(): SprintBoardRepository {
  const source = import.meta.env.VITE_DATA_SOURCE ?? 'api'

  if (source === 'api') {
    throw new Error('API data source is not implemented yet')
  }

  return new repoDexie() // Default to Dexie implementation
}

export const SPRINT_BOARD_REPO: InjectionKey<SprintBoardRepository> =
  Symbol('SprintBoardRepository')
