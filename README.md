# Asescon Frontend

Aplicación web frontend desarrollada con **Next.js** para el sistema Asescon, enfocada en la gestión de contenido, servicios, intranet y panel administrativo.

---

## 🚀 Tecnologías principales

- Next.js 14+ (App Router)
- React
- TypeScript
- React Hook Form
- Zod (validación de esquemas)
- TanStack Query (React Query)
- Zustand (estado global)
- Tailwind CSS
- Framer Motion
- Lucide Icons

---

## 📦 Arquitectura del proyecto

El proyecto está organizado bajo una arquitectura modular por features:

src/
├── app/ # Rutas (App Router)
├── features/ # Módulos por dominio (blog, servicio, intranet, etc.)
├── shared/ # Componentes reutilizables
├── components/ # UI base (atoms, molecules)
├── lib/ # Utilidades y helpers
├── hooks/ # Hooks globales
├── types/ # Tipos globales TypeScript


---

## ⚙️ Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/asescon-frontend.git

# Entrar al proyecto
cd asescon-frontend

# Instalar dependencias
npm install
# o
pnpm install