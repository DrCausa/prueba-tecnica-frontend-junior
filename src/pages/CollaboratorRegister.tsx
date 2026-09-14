import * as z from "zod"

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
  return (
    <div>CollaboratorRegister</div>
  )
}

export default CollaboratorRegister