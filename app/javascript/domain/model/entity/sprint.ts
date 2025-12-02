export interface Sprint {
  id: number
  boardId: number
  name: string
  goal?: string
  capacityHours: number
  velocityForecast: number
  // UI indicator whether the sprint is currently active
  isActive: boolean
  startDate: string
  endDate: string
  createdAt: string
}
