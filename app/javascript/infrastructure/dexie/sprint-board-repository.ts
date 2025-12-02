import type { SprintBoardRepository } from '@domain/repositories/sprint-board-repository'
import type { SprintBoardView, StoryWithSubtasks } from '@domain/model/view/sprint-board-view'
import type { SubTask } from '@domain/model/entity/subtask'
import { db } from './db'

async function getSprintBoardBySprintId(sprintId: number): Promise<SprintBoardView> {
  const loadSprint = async (id: number) => {
    return await db.sprints.get(id)
  }

  const loadBoardForSprint = async (sprintId: number) => {
    const sprint = await db.sprints.get(sprintId)

    if (!sprint) throw new Error('Sprint not found')

    return await db.boards.get(sprint.boardId)
  }

  const loadColumnsByBoardId = async (boardId: number) => {
    return await db.columns.where('boardId').equals(boardId).toArray()
  }

  const loadStoriesBySprintId = async (sprintId: number) => {
    return await db.stories.where('sprintId').equals(sprintId).toArray()
  }

  const loadSubTasksBySprintId = async (storyIds: number[]) => {
    return await db.subtasks.where('storyId').anyOf(storyIds).toArray()
  }

  const loadStoryColumnPositionsByStoryIds = async (storyIds: number[]) => {
    return await db.storyColumnPosition.where('storyId').anyOf(storyIds).toArray()
  }

  const [sprint, board, stories] = await Promise.all([
    loadSprint(sprintId),
    loadBoardForSprint(sprintId),
    loadStoriesBySprintId(sprintId),
  ])

  if (!sprint) {
    return {
      sprint: undefined,
      board: undefined,
      columns: [],
    }
  }

  const columns = await loadColumnsByBoardId(sprint.boardId)
  const storyIds = stories.map((s) => s.id)
  const subtasks = await loadSubTasksBySprintId(storyIds)

  const positions = await loadStoryColumnPositionsByStoryIds(storyIds)

  const subtasksByStoryId = new Map<number, SubTask[]>()
  for (const sub of subtasks) {
    const list = subtasksByStoryId.get(sub.storyId) ?? []
    list.push(sub)
    subtasksByStoryId.set(sub.storyId, list)
  }

  const storiesByColumnId = new Map<number, StoryWithSubtasks[]>()
  for (const pos of positions) {
    const story = stories.find((s) => s.id === pos.storyId)
    if (!story) continue

    const list = storiesByColumnId.get(pos.columnId) ?? []
    list.push({
      story,
      subtasks: subtasksByStoryId.get(story.id) ?? [],
    })
    storiesByColumnId.set(pos.columnId, list)
  }

  return {
    sprint,
    board,
    columns: columns
      .sort((a, b) => a.order - b.order)
      .map((column) => ({
        column,
        stories: (storiesByColumnId.get(column.id!) ?? []).sort(
          (a, b) =>
            (positions.find((p) => p.storyId === a.story.id)?.order ?? 0) -
            (positions.find((p) => p.storyId === b.story.id)?.order ?? 0),
        ),
      })),
  }
}

export default class SprintBoardRepositoryDexie implements SprintBoardRepository {
  async getSprintBoardBySprintId(sprintId: number): Promise<SprintBoardView> {
    return getSprintBoardBySprintId(sprintId)
  }
}
