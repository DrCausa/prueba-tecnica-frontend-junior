import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
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

    fetchCollaborator()
  }, [id])

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Detalle del Colaborador</h1>
        <Link to="/" className="text-blue-600 hover:underline text-sm font-medium">
          &larr; Volver al listado
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : collaborator ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                {collaborator.first_name.charAt(0)}{collaborator.last_name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {collaborator.first_name} {collaborator.last_name}
                </h2>
                <span className={`inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${collaborator.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {collaborator.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 font-medium">Correo electrónico</p>
                <p className="text-gray-900 mt-1">{collaborator.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Teléfono</p>
                <p className="text-gray-900 mt-1">{collaborator.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Rol en la empresa</p>
                <p className="text-gray-900 mt-1">{collaborator.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Fecha de registro</p>
                <p className="text-gray-900 mt-1">
                  {new Date(collaborator.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CollaboratorDetail