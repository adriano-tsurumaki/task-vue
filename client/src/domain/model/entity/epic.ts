export interface Epic {
  id: number
  name: string
  description: string
  // Lifecycle status of the epic
  status: 'open' | 'in_progress' | 'closed'
  // UI grouping color for the epic
  color: string
  createdAt: string
  updatedAt: string
}
