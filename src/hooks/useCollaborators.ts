import { useCallback, useEffect, useState } from "react"
import type { Collaborator } from "../types/collaborator"
import { getCollaborators, toggleStatus } from "../api/mockCollaborators"

export const useCollaborators = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCollaborators = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getCollaborators()
      setCollaborators(data)
    } catch (err) {
      setError("Ocurrió un error al cargar los colaboradores")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCollaborators()
  }, [fetchCollaborators])

  const handleToggleStatus = async (id: number) => {
    try {
      const updatedCollaborator = await toggleStatus(id)
      setCollaborators(prev => prev.map(c => c.id === id ? updatedCollaborator : c))
    } catch (err) {
      console.error("Error al cambiar el estado del colaborador")
    }
  }

  return {
    collaborators,
    isLoading,
    error,
    handleToggleStatus,
    refreshCollaborators: fetchCollaborators
  }
}