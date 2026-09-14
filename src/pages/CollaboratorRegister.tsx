import { useState } from "react"
import { Link, useNavigate } from "react-router"
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
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Registrar Colaborador</h1>
        <Link to="/" className="text-blue-600 hover:underline text-sm font-medium">
          &larr; Volver al listado
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* nombres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombres <span className="text-red-500">*</span></label>
              <input
                {...register('first_name')}
                className={`w-full px-3 py-2 border rounded-lg outline-none transition focus:ring-2 
                  ${errors.first_name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                placeholder="Ej. Juan Pablo"
              />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
            </div>

            {/* apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos <span className="text-red-500">*</span></label>
              <input
                {...register('last_name')}
                className={`w-full px-3 py-2 border rounded-lg outline-none transition focus:ring-2 
                  ${errors.last_name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                placeholder="Ej. Pérez"
              />
              {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* correo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico <span className="text-red-500">*</span></label>
              <input
                {...register('email')}
                type="email"
                className={`w-full px-3 py-2 border rounded-lg outline-none transition focus:ring-2 
                  ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                placeholder="correo@empresa.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono <span className="text-red-500">*</span></label>
              <input
                {...register('phone')}
                type="tel"
                className={`w-full px-3 py-2 border rounded-lg outline-none transition focus:ring-2 
                  ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                placeholder="Ej. 999000000"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol <span className="text-red-500">*</span></label>
              <select
                {...register('role')}
                className={`w-full px-3 py-2 border rounded-lg outline-none transition focus:ring-2 bg-white
                  ${errors.role ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              >
                <option value="">Selecciona un rol</option>
                <option value="Admin">Admin</option>
                <option value="Scrum Master">Scrum Master</option>
                <option value="Tech Lead">Tech Lead</option>
                <option value="Developer">Developer</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
            </div>

            {/* contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña <span className="text-red-500">*</span></label>
              <input
                {...register('password')}
                type="password"
                className={`w-full px-3 py-2 border rounded-lg outline-none transition focus:ring-2 
                  ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                placeholder="********"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
            <Link
              to="/"
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CollaboratorRegister