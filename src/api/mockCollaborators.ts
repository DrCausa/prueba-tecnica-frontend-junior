import type { Collaborator } from "../types/collaborator";

let collaborators: Collaborator[] = [
  {
    "id": 1,
    "first_name": "Pedro",
    "last_name": "García",
    "email": "pedro.garcia@empresa.com",
    "phone": "999000001",
    "role": "Developer",
    "is_active": true,
    "created_at": "2026-01-10T10:00:00Z"
  },
  {
    "id": 2,
    "first_name": "Ana",
    "last_name": "Torres",
    "email": "ana.torres@empresa.com",
    "phone": "999000002",
    "role": "Tech Lead",
    "is_active": false,
    "created_at": "2026-02-05T14:30:00Z"
  }
]

const delay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms))

export const getCollaborators = async (): Promise <Collaborator[]> => {
  await delay()
  return [...collaborators]
}

export const createCollaborator = async (
  data: Omit<Collaborator, 'id' | 'created_at' | 'is_active'>
): Promise<Collaborator> => {
  await delay()
  const newCollaborator: Collaborator = {
    ...data,
    id: Date.now(),
    is_active: true,
    created_at: new Date().toISOString()
  }
  collaborators = [...collaborators, newCollaborator]
  return newCollaborator
}

export const toggleStatus = async (id: number): Promise<Collaborator> => {
  await delay(500)
  const index = collaborators.findIndex(c => c.id === id)
  if (index === -1) throw new Error("Colaborador no encontrado")

  const updatedCollaborator = {
    ...collaborators[index],
    is_active: !collaborators[index].is_active
  }

  collaborators[index] = updatedCollaborator
  return updatedCollaborator
}

export const getCollaboratorById = async (id: number): Promise<Collaborator | undefined> => {
  await delay(600)
  return collaborators.find(c => c.id === id)
} 
