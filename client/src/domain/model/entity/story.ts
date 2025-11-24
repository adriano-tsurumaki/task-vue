export interface Story {
  id: number
  epicId: number
  title: string
  description: string
  // For PO and QA reference
  acceptanceCriteria: string
  storyPoints: number
  priority: 'low' | 'medium' | 'high'
  // Business value score for prioritization
  businessValue: number
  riskLevel: 'low' | 'medium' | 'high'
  type: 'story' | 'bug' | 'task' | 'improvement' | 'research'
  // UI indicator
  sprintId: number | null
  status: 'to_do' | 'in_progress' | 'review' | 'in_review' | 'done' | 'blocked'
}
