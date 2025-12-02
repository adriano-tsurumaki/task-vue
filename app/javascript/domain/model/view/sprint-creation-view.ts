export interface SprintCreationDetailView {
  name: string
  goal?: string
  startDate: string
  endDate: string
  capacityHours: number
  velocityForecast: number
  isActive: boolean
}

export interface SprintCreationBoardView {
  id?: number
  mode: 'existing-board' | 'new-board'
  name: string
  description?: string
  columns: SprintCreationColumnView[]
}

export interface SprintCreationColumnView {
  // For vue loop
  key: number
  title: string
  wipLimit: number | undefined
  order: number
  statuses: string[]
}
