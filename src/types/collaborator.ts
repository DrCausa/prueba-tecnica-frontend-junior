export type Role = "Admin" | "Scrum Master" | "Tech Lead" | "Developer"

export interface Collaborator {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  role: Role
  is_active: boolean
  created_at: string
}
