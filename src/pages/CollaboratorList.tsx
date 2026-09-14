import { useMemo, useState } from "react"
import { Link } from "react-router"
import { useCollaborators } from "../hooks/useCollaborators"
import { useDebounce } from "../hooks/useDebounce"
import { ShieldAlert, Search } from "lucide-react"
import type { Role } from "../types/collaborator"

const CollaboratorList = () => {
  const { collaborators, isLoading, error, handleToggleStatus } = useCollaborators()

  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all")

  const [collaboratorToToggle, setCollaboratorToToggle] = useState<number | null>(null)

  const filteredCollaborators = useMemo(() => {
    return collaborators.filter((collab) => {
      const fullName = `${collab.first_name} ${collab.last_name}`.toLowerCase()
      const matchSearch = fullName.includes(debouncedSearch.toLowerCase()) || collab.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    
      const matchStatus = statusFilter === "all"
        ? true
        : statusFilter === "active" ? collab.is_active : !collab.is_active

      const matchRole = roleFilter === "all" ? true : collab.role === roleFilter

      return matchSearch && matchStatus && matchRole
    })
  }, [collaborators, debouncedSearch, statusFilter, roleFilter])

  const confirmToggleStatus = async () => {
    if (collaboratorToToggle !== null) {
      await handleToggleStatus(collaboratorToToggle)
      setCollaboratorToToggle(null)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Colaboradores</h1>
        <Link 
          to="/registro" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
        >
          Registrar colaborador
        </Link>
      </div>

      {/* controles de filtro */}
      <div className="bg-white p-4 rounded-t-xl border-b border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o correo..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>

        <select 
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as any)}
        >
          <option value="all">Todos los roles</option>
          <option value="Admin">Admin</option>
          <option value="Scrum Master">Scrum Master</option>
          <option value="Tech Lead">Tech Lead</option>
          <option value="Developer">Developer</option>
        </select>
      </div>

      {/* tabla de resultados */}
      <div className="bg-white shadow-sm rounded-b-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
              <th className="py-3 px-6 font-medium">Nombre completo</th>
              <th className="py-3 px-6 font-medium">Correo</th>
              <th className="py-3 px-6 font-medium">Rol</th>
              <th className="py-3 px-6 font-medium">Estado</th>
              <th className="py-3 px-6 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50 animate-pulse">
                  <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                  <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
                  <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  <td className="py-4 px-6"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                  <td className="py-4 px-6"><div className="h-8 bg-gray-200 rounded w-20 ml-auto"></div></td>
                </tr>
              ))
            ) : error ? (
              <tr><td colSpan={5} className="py-8 text-center text-red-500">{error}</td></tr>
            ) : filteredCollaborators.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  No se encontraron colaboradores que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              filteredCollaborators.map((collab) => (
                <tr key={collab.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="py-3 px-6 font-medium text-gray-800">
                    {collab.first_name} {collab.last_name}
                  </td>
                  <td className="py-3 px-6 text-gray-600">{collab.email}</td>
                  <td className="py-3 px-6 text-gray-600">{collab.role}</td>
                  <td className="py-3 px-6">
                    {/* badge de estado */}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${collab.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {collab.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right flex justify-end gap-2">
                    <Link
                      to={`/colaboradores/${collab.id}`}
                      className="text-sm font-medium px-3 py-1.5 rounded transition text-blue-600 hover:bg-blue-50"
                    >
                      Detalle
                    </Link>
                    <button
                      onClick={() => setCollaboratorToToggle(collab.id)}
                      className={`text-sm font-medium px-3 py-1.5 rounded transition ${
                        collab.is_active 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {collab.is_active ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* modal de confirmación */}
      {collaboratorToToggle !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-lg font-bold text-gray-900">Confirmar acción</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              ¿Estás seguro de que deseas cambiar el estado de este colaborador?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setCollaboratorToToggle(null)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmToggleStatus}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollaboratorList