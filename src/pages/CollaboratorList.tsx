import { useMemo, useState } from "react"
import { useCollaborators } from "../hooks/useCollaborators"
import { useDebounce } from "../hooks/useDebounce"
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
    <div>CollaboratorList</div>
  )
}

export default CollaboratorList