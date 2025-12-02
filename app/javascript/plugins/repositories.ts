import {
  createSprintBoardRepoFactory,
  SPRINT_BOARD_REPO,
} from '@infra/factory/sprint-board-repo-factory'
import {
  createSprintCreationRepoFactory,
  SPRINT_CREAT_REPO,
} from '@infra/factory/sprint-creat-repo-factory'
import type { App } from 'vue'

export default {
  install(app: App<Element>) {
    const SprintBoardRepository = createSprintBoardRepoFactory()
    app.provide(SPRINT_BOARD_REPO, SprintBoardRepository)
    const SprintCreationRepository = createSprintCreationRepoFactory()
    app.provide(SPRINT_CREAT_REPO, SprintCreationRepository)
  },
}
