# Asescon App

Proyecto MVP web empresarial para gestión de contacto e intranet, desarrollado con Next.js, Prisma y PostgreSQL.

## Stack Usado

- Next.js v16
- React 22 + TypeScript
- Tailwind CSS
- Framer Motion

## Método de Instalación

## Arquitectura implementada
Feature-Driven

```bash
pnpm install
pnpm dev

## FORME
# Zustand 
UI - state

# NO colocar en Zustand - Porque RHF ya optimiza eso brutalmente-->
form values
inputs
validation
loading states de forms
react-hook-form state

# REACT QUERY
server state

# RHF
form state

# HOOKS
derived/business logic

# COMPONENTS.
UI rendering

# Subir cambios
git add .
git commit -m ""
git push origin refactor-arquitectura

# Puntos a tomar en cuenta

views  -> orquestan
hooks  -> transforman
utils  -> abstraen lógica pura
components -> encapsulan UI reutilizable
table -> renderiza entidades tabulares
store -> controla UI/global state
api -> comunica backend
schemas -> validan contratos
modals/drawers -> overlays desacoplados


Flujo de final -->
src/features/.../api/post.query.ts
        ↓
fetch(http://localhost:3000/api/admin/blog/post/9)
        ↓
src/app/api/admin/blog/post/[id]/route.ts
        ↓
serverApiClient()
        ↓
http://localhost:3001/api/post/9

// URL
La URL se lee, no se sincroniza.

filters (externo)
localSearch (input UI)
setFilters (único punto de escritura)

✔ Mucho más estable
✔ Mucho menos propenso a bugs de sincronización
✔ Más performante (menos renders inútiles)

Unete - Form
Para un formulario de empleo real, mi combinación sería:

✅ isSubmitting para evitar doble click
✅ Toast success/error
✅ Rate Limit en NestJS (obligatorio)
✅ Cloudflare Turnstile (muy recomendable)

Fusionar ramas Proceso -->
desde la rama secundaria:

git status
git add .
git commit -m "WIP: ajustes antes de merge"

git checkout main
git pull origin main

git checkout <rama-secundaria>
git rebase main
git add .
git rebase --continue

git checkout main
git merge <rama-secundaria>

git push origin main
git push origin <rama-secundaria>

6. Limpieza (opcional pero recomendado)
Eliminar la rama
git branch -d <rama-secundaria>
git push origin --delete <rama-secundaria>

Lighthouse
pnpm exec lighthouse http://localhost:3000