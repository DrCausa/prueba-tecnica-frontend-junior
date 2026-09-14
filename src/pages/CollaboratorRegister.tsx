import { useState } from "react"
import { useNavigate } from "react-router"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createCollaborator } from "../api/mockCollaborators"

const roles = ["Admin", "Scrum Master", "Tech Lead", "Developer"] as const

const registerSchema = z.object({
  first_name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().min(1, "El apellido es requerido"),
  email: z.email("Formato de correo inválido").min(1, "El correo es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  role: z.enum(roles, { error: "Debes proporcionar un rol válido" }),
  password: z.string()
  .min(8, "Debe tener al menos 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
})

type RegisterFormValues = z.infer<typeof registerSchema>

const CollaboratorRegister = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setApiError(null)

    try {
      const { password, ...collaboratorData } = data
      await createCollaborator(collaboratorData)

      alert("Colaborador registrado con éxito")
      navigate("/")
    } catch (err) {
      setApiError("Ocurrió un error al guardar el colaborador. Intenta de nuevo.")
    }
  }

  return (
    <div>CollaboratorRegister</div>
  )
}

export default CollaboratorRegister