# Prueba Técnica — Frontend (React)

> Basada en el módulo **Colaboradores** del proyecto ELISA.
> Objetivo: evaluar fundamentos de React + TypeScript, consumo de datos, formularios,
> validación y buenas prácticas de UI. **No** se espera que implementes todo el módulo:
> el alcance está acotado para una persona junior.

---

## 1. Contexto

Una empresa gestiona a sus **colaboradores** (empleados) desde un panel interno.
Un usuario administrador necesita poder **listar**, **buscar/filtrar** y **registrar**
colaboradores, además de **activarlos o desactivarlos**.

Tu tarea es construir una **mini-aplicación de una sola sección** ("Colaboradores")
que cubra ese flujo básico.

---

## 2. Objetivo

Construir una SPA en **React + TypeScript** con:

1. Una **vista de listado** de colaboradores (tabla) con búsqueda y filtros.
2. Un **formulario de registro** de colaborador con validación.
3. La acción de **activar / desactivar** un colaborador.

El foco es la **calidad del código**, el **tipado** y la **experiencia de usuario**
(estados de carga, vacíos y errores), no la cantidad de funcionalidades.

---

## 3. Stack requerido

Obligatorio:

- **React 18 o 19** con **Vite**
- **TypeScript** (modo estricto)
- **React Router** para la navegación entre listado y formulario
- **React Hook Form** + **Zod** para el formulario y su validación
- **Tailwind CSS** para los estilos

Opcional (suma, no obligatorio):

- **shadcn/ui** para componentes (Table, Card, Button, Input, Select, Badge, Dialog)
- **Axios** para las peticiones
- **lucide-react** para íconos

> Si no usás shadcn/ui, podés maquetar los componentes a mano con Tailwind. No pasa nada.

---

## 4. Requisitos funcionales

### 4.1 Listado de colaboradores (obligatorio)

- Mostrar los colaboradores en una **tabla** con las columnas:
  `Nombre completo`, `Correo`, `Rol`, `Estado` y `Acciones`.
- **Buscador** por nombre o correo. Debe usar **debounce** (300–500 ms) para no
  filtrar en cada tecla.
- **Filtro por estado**: Todos / Activos / Inactivos (un `select`).
- **Filtro por rol** (un `select`).
- **Badge de estado** con color: verde para *Activo*, gris/rojo para *Inactivo*.
- **Estado de carga**: mostrar un *skeleton* o un texto/spinner mientras se cargan los datos.
- **Estado vacío**: si no hay resultados, mostrar un mensaje claro
  (ej. *"No se encontraron colaboradores"*).
- **Botón "Registrar colaborador"** que navega al formulario.

### 4.2 Registro de colaborador (obligatorio)

- Formulario dentro de una tarjeta/página, con los campos:
  - `Nombres` (requerido)
  - `Apellidos` (requerido)
  - `Correo` (requerido, formato de email válido)
  - `Teléfono` (requerido)
  - `Rol` (select, requerido)
  - `Contraseña` (requerido, mínimo 8 caracteres, al menos 1 mayúscula y 1 número)
- Validación con **Zod** integrada vía **React Hook Form** (`zodResolver`).
- Mostrar los **mensajes de error** debajo de cada campo.
- El botón **"Guardar"** debe estar **deshabilitado** mientras el formulario sea inválido
  o mientras se esté enviando.
- Al guardar con éxito: mostrar una **notificación** (toast o alerta) y **redirigir**
  al listado.
- Botón **"Cancelar"** que vuelve al listado sin guardar.

### 4.3 Activar / Desactivar (obligatorio)

- En la columna `Acciones`, un botón para **cambiar el estado** del colaborador.
- Antes de aplicar el cambio, mostrar un **modal de confirmación**
  (*"¿Desea desactivar a este colaborador?"*).
- Al confirmar, actualizar el estado en la tabla y mostrar una notificación.

---

## 5. Datos / API

No necesitás un backend real. Elegí **una** de estas opciones:

- **Opción A (recomendada):** un archivo local `mockCollaborators.ts` con un array
  en memoria, y funciones simuladas (`getCollaborators`, `createCollaborator`,
  `toggleStatus`) que devuelvan `Promise` con un pequeño `setTimeout` para simular
  latencia (y así poder mostrar el estado de carga).
- **Opción B:** [`json-server`](https://github.com/typicode/json-server) o
  [MSW](https://mswjs.io/) apuntando a un JSON local.

### Ejemplo de estructura de datos

```ts
interface Collaborator {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "Admin" | "Scrum Master" | "Tech Lead" | "Developer";
  is_active: boolean;
  created_at: string; // ISO
}
```

```json
[
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
```

---

## 6. Requisitos técnicos

- Todo el código en **TypeScript**: tipar props, estado, y respuestas de datos
  (nada de `any`).
- **Componentes reutilizables** y con responsabilidad única (evitar un solo archivo gigante).
- Separar la **lógica** de la **vista** (por ejemplo, un custom hook `useCollaborators`
  para el estado del listado y las llamadas a datos).
- **Diseño responsive**: la tabla y los filtros deben verse bien en desktop y adaptarse
  en móvil (scroll horizontal en la tabla es aceptable).
- Estructura de carpetas ordenada (ej. `components/`, `hooks/`, `pages/`, `types/`, `api/`).
- El proyecto debe **compilar sin errores** (`npm run build` / `pnpm build`) y sin errores de lint.

---

## 7. Bonus (opcional — suma, no resta si no lo hacés)

- **Paginación** en la tabla (ej. 10 por página).
- **Chips de filtros aplicados** con opción de quitarlos individualmente y un
  "Limpiar filtros".
- **Vista de detalle** del colaborador en `/colaboradores/:id`.
- **Edición** de un colaborador reutilizando el formulario de registro.
- **Tests** con Vitest + Testing Library (aunque sea del formulario o del hook).
- Ocultar el botón "Registrar" según un rol simulado (RBAC básico).
- Persistencia de los filtros en la **URL** (query params).

---

## 8. Criterios de evaluación

| Área | Qué miramos | Peso |
|------|-------------|------|
| **Funcionalidad** | Que el listado, filtros, registro y activar/desactivar funcionen | 30% |
| **Calidad de código** | Componentes claros, tipado correcto, sin duplicación, nombres consistentes | 25% |
| **React / Hooks** | Uso correcto de `useState`, `useEffect`, custom hooks, dependencias | 15% |
| **Formularios y validación** | RHF + Zod bien integrados, mensajes de error, UX del submit | 15% |
| **UX / UI** | Estados de carga, vacío y error; diseño responsive y prolijo | 10% |
| **Git y entrega** | Commits ordenados y con mensajes claros, README con instrucciones | 5% |

> Valoramos más un alcance **más chico pero bien hecho** que uno grande a medias.

---

## 9. Entregables

1. **Repositorio** en GitHub (público o con acceso), o un `.zip` del proyecto
   **sin** `node_modules`.
2. Un **`README.md`** con:
   - Cómo instalar y levantar el proyecto.
   - Decisiones que tomaste y qué harías con más tiempo.
   - Qué partes del bonus completaste (si aplica).
3. (Opcional) Un video corto o capturas mostrando la app funcionando.

---

## 10. Tiempo estimado

- **Núcleo (secciones 4.1 a 4.3):** entre **6 y 10 horas**.
- No es necesario que dediques más de eso. Preferimos ver hasta dónde llegás
  con buena calidad antes que una entrega apurada.
- Sugerencia de plazo de entrega: **3 a 5 días** desde que recibís la prueba.

---

## 11. Recomendaciones

- Empezá por el **listado con datos mockeados**, luego el **formulario**, y al final
  **activar/desactivar**.
- Hacé **commits pequeños** a medida que avanzás (no un único commit final).
- Si algo no te da el tiempo, dejálo documentado en el README en vez de dejarlo a medias.
- Ante cualquier duda de alcance, **asumí lo razonable y anotalo** — también evaluamos
  criterio.

¡Éxitos! 🚀
