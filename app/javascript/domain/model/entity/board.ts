export interface Board {
  id?: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  archived: boolean
}

export interface Column {
  id?: number
  boardId: number
  title: string
  wipLimit?: number
  order: number
  createdAt: string
  updatedAt: string
}

export interface Card {
  id?: number
  boardId: number
  columnId: number
  title: string
  description?: string
  order: number
  dueDate?: string
  assignedTo?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}
