// src/domain/model/sprint-board-view.ts
import type { Sprint } from '../entity/sprint'
import type { Board, Column } from '../entity/board'
import type { Story } from '../entity/story'
import type { SubTask } from '../entity/subtask'

export interface StoryWithSubtasks {
  story: Story
  subtasks: SubTask[]
}

export interface SprintBoardColumn {
  column: Column
  stories: StoryWithSubtasks[]
}

export interface SprintBoardView {
  sprint?: Sprint
  board?: Board
  columns: SprintBoardColumn[]
}
