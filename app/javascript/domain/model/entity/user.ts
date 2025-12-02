export interface User {
  id: number
  name: string
  email: string
  role: 'Product Owner' | 'Scrum Master' | 'Developer' | 'Tester'
  createdAt: string
}
