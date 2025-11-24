import type { Board, Card, Column } from '@/domain/model/entity/board'
import type { Epic } from '@/domain/model/entity/epic'
import type { Sprint } from '@/domain/model/entity/sprint'
import type { Story } from '@/domain/model/entity/story'
import type { StoryColumnPosition } from '@/domain/model/entity/story-column-position'
import type { SubTask } from '@/domain/model/entity/subtask'
import type { User } from '@/domain/model/entity/user'
import Dexie, { type EntityTable } from 'dexie'

const db = new Dexie('TaskFlow') as Dexie & {
  boards: EntityTable<Board, 'id'>
  columns: EntityTable<Column, 'id'>
  cards: EntityTable<Card, 'id'>
  epics: EntityTable<Epic, 'id'>
  sprints: EntityTable<Sprint, 'id'>
  stories: EntityTable<Story, 'id'>
  users: EntityTable<User, 'id'>
  subtasks: EntityTable<SubTask, 'id'>
  storyColumnPosition: EntityTable<StoryColumnPosition, 'id'>
}

db.version(1).stores({
  boards: '++id, name, archived, createdAt',
  columns: '++id, boardId, name, order, createdAt',
  cards: '++id, boardId, columnId, title, order, dueDate, createdAt',
  epics: '++id, name, status, createdAt',
  sprints: '++id, name, status, startDate, endDate, createdAt',
  stories: '++id, title, epicId, sprintId, status, createdAt',
  users: '++id, name, email, role, createdAt',
  subtasks: '++id, storyId, title, status, createdAt',
  storyColumnPosition: '++id, storyId, columnId, order',
})

export { db }
