import type { InjectionKey } from 'vue'
import type { SprintCreationRepository } from '@/domain/repositories/sprint-creat-repository'
import repoDexie from '@infra/dexie/sprint-creation-repository'

export function createSprintCreationRepoFactory(): SprintCreationRepository {
  const source = import.meta.env.VITE_DATA_SOURCE ?? 'api'

  if (source === 'api') {
    throw new Error('API data source is not implemented yet')
  }

  return new repoDexie() // Default to Dexie implementation
}

export const SPRINT_CREAT_REPO: InjectionKey<SprintCreationRepository> = Symbol(
  'SprintCreationRepository',
)
