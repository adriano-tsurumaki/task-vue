export interface SubTask {
  id: number
  storyId: number
  title: string
  description?: string
  status: 'to_do' | 'in_progress' | 'done'
  assignedTo: number | null
  createdAt: string
}
