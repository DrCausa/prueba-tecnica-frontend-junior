import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { Collaborator } from "../types/collaborator"
import { getCollaboratorById } from "../api/mockCollaborators"

const CollaboratorDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollaborator = async () => {
      if (!id) return
      setIsLoading(true)
      setError(null)

      try {
        const data = await getCollaboratorById(Number(id))

        if (data) {
          setCollaborator(data)
        } else {
          setError("Colaborador no encontrado.")
        }
      } catch (err) {
        setError("Ocurrió un error al obtener la información")
      } finally {
        setIsLoading(false)
      }
    }
  }, [id])

  return (
    <div>CollaboratorDetail</div>
  )
}

export default CollaboratorDetail