# Prueba Técnica — Frontend Junior

Este proyecto es una mini-aplicación tipo SPA (Single Page Application) desarrollada en **React 19** y **TypeScript**, diseñada para gestionar colaboradores mediante un listado interactivo, un formulario de registro y una vista de detalles.

## Cómo instalar y levantar el proyecto

Asegúrate de tener Node.js instalado en tu sistema.

1. **Clonar o descomprimir el proyecto:**
  Abre una terminal y navega hasta la carpeta del proyecto.

2. **Instalar dependencias:**
  ```bash
  npm install

  # o si usas pnpm:
  pnpm install
  ```

3. **Levantar el servidor de desarrollo:**
  ```bash
  npm run dev

  # o si usas pnpm:
  pnpm run dev
  ```

4. **Abrir en el navegador:**
  La aplicación estará corriendo normalmente en `http://localhost:5173`.

## Decisiones Técnicas

Durante el desarrollo, prioricé la calidad del código, el tipado estricto y la experiencia de usuario (UX):

- **Arquitectura y Custom Hooks:** Se separó la lógica de la vista mediante el hook `useCollaborators` para manejar los estados globales (carga, error, datos) y centralizar la comunicación con la "API".
- **Navegación Dinámica:** Se integró `react-router` para manejar las transiciones fluidas entre el listado, el formulario de registro y la vista de detalle, extrayendo parámetros de la URL (`:id`) para la carga de datos específicos.
- **Optimización de Búsqueda:** Se implementó un hook `useDebounce` (500ms) para el input de búsqueda. Esto evita re-renderizados innecesarios y simula el comportamiento óptimo contra un backend real al no filtrar/consultar en cada pulsación de tecla.
- **Validación Robusta:** Se integró `React Hook Form` junto con `Zod` configurado en `mode: 'onChange'`. Esto permite que el botón "Guardar" se habilite/deshabilite de forma dinámica y proporciona *feedback* en tiempo real al usuario.
- **Mock de API:** Se optó por la Opción A, creando un estado en memoria (`mockCollaborators.ts`) con una función `delay` para simular la latencia de red y poder observar los *skeleton loaders* y estados de transición en todas las vistas.
- **UI Responsiva:** Se utilizó Tailwind CSS (v4) construyendo componentes a medida sin depender de librerías externas de UI. La tabla implementa `overflow-x-auto` para garantizar la accesibilidad en dispositivos móviles.

## Qué haría con más tiempo

Si el alcance de tiempo fuera mayor, implementaría las siguientes mejoras:

1. **Testing:** Añadiría pruebas unitarias e integración utilizando *Vitest* y *React Testing Library*, enfocándome en la lógica del hook de filtrado y las validaciones del formulario.
2. **Paginación:** Implementaría un sistema de paginación o *infinite scroll* en la tabla, lo cual es vital cuando la base de datos crece.
3. **Notificaciones Mejoradas:** Cambiaría las alertas nativas (`alert()`) por un sistema de *toasts* profesional usando librerías como `sonner` o `react-hot-toast`.
4. **Mock de Red (MSW):** Migraría el mockeo en memoria a *Mock Service Worker (MSW)* para interceptar peticiones a nivel de red, simulando un entorno RESTful mucho más realista.
5. **Persistencia en URL:** Sincronizaría los filtros (búsqueda, estado, rol) con los *query parameters* de la URL para que los resultados puedan compartirse directamente con un link.

## Bonus Completados

- [x] Tipado estricto absoluto.
- [x] Diseño responsivo funcional (Mobile-first en layouts, scroll adaptativo en tabla).
- [x] Modal de confirmación customizado para acciones destructivas/críticas.
- [x] Vista de detalle del colaborador en /colaboradores/:id