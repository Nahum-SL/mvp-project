# Asescon Frontend

Aplicación web frontend desarrollada con **Next.js** para el sistema Asescon, enfocada en la gestión de contenido, servicios, intranet y panel administrativo.

---

## 🚀 Tecnologías principales

| Tecnología | Versión / Uso |
|---|---|
| Next.js | 14+ (App Router) |
| React | UI Library |
| TypeScript | Tipado estricto |
| React Hook Form | Manejo de formularios |
| Zod | Validación de esquemas |
| TanStack Query | Fetching y caché |
| Zustand | Estado global |
| Tailwind CSS | Estilos utilitarios |
| Framer Motion | Animaciones |
| Lucide Icons | Iconografía |

---

## 📦 Arquitectura del proyecto

El proyecto está organizado bajo una arquitectura modular por features:

---

## 📦 Arquitectura del proyecto

El proyecto está organizado bajo una arquitectura modular por features:

```text
src/
├── app/                  # Rutas y páginas principales (Next.js App Router)
├── features/             # Módulos aislados por dominio (blog, servicio, intranet)
├── shared/               # Componentes y lógica de negocio reutilizable cross-feature
├── components/           # UI Base / Átomos del sistema de diseño (shadcn, botones)
├── lib/                  # Configuraciones de clientes (Prisma, Axios) y utilidades
├── hooks/                # Custom Hooks globales y compartidos
└── types/                # Definiciones de tipos globales de TypeScript
```

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
```

---

## ▶️ Ejecución en desarrollo

```bash
npm run dev
# o
pnpm dev
```

La aplicación se ejecutará en: [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Build de producción

```bash
pnpm run build
pnpm run start
```

---

## 🔐 Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Asescon
```

---

## 📡 Backend requerido

Este frontend consume una API desarrollada con el siguiente stack:

| Tecnología | Rol |
|---|---|
| NestJS | Framework backend |
| Prisma ORM | Acceso a base de datos |
| PostgreSQL | Base de datos relacional |
| Cloudinary | Gestión de imágenes |

> 📁 Repositorio backend: [`/asescon-backend`](../asescon-backend)

---

## 🧠 Funcionalidades principales

### 📝 Blog
- Crear, editar y eliminar posts
- Editor enriquecido
- Subida de imágenes
- Categorías dinámicas

### 🧩 Servicios
- Gestión de servicios
- Sistema de recomendaciones
- Categorización por tipo de negocio

### 🏢 Intranet
- Panel interno de navegación
- Gestión de links administrativos
- Control por roles

### 📩 Contactos
- Registro de leads
- Panel administrativo
- Cambio de estado de contacto

---

## 🧪 Calidad de código

- ✅ ESLint configurado
- ✅ Tipado estricto con TypeScript
- ✅ Validación de formularios con Zod
- ✅ Manejo de estado con React Query + Zustand

---

## 📁 Convenciones

| Carpeta | Descripción |
|---|---|
| `features/` | Lógica por dominio |
| `shared/` | Reutilizable global |
| `hooks/` | Lógica aislada |
| `schemas/` | Validaciones Zod |
| `api/` | Comunicación con backend |

---

## 📷 Capturas 

> Puedes agregar screenshots aquí del dashboard, editor de blog, formularios, etc.

---

## 👨‍💻 Autor

Desarrollado por **[Nahum Salazar Levano](https://github.com/Nahum-SL)**

---

## 📌 Notas

> Este proyecto está en constante evolución y forma parte de un sistema full-stack basado en **Next.js + NestJS**.