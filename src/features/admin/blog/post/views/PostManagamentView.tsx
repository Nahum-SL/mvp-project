// features/admin/blog/post/views/PostManagementView.tsx
"use client";

import { useAdminPosts } from "../hooks/use-post-queries";
import { useFilteredPosts } from "../hooks/use-filtered-posts";
import { PostTable } from "../table/PostTable";
import { PostPreviewDrawer } from "../drawers/PostPreviewDrawers";
import { DeletePostModal } from "../modals/DeletePostModal";
import { FileText, Plus } from "lucide-react";

export function PostManagementView() {
  const { data: serverPosts = [], isLoading } = useAdminPosts();

  // Custom hook que procesa filtros en memoria (Zustand + useMemo)
  const posts = useFilteredPosts({ posts: serverPosts });
    
  return (
    <div className="space-y-6 container mx-auto px-4 py-6 max-w-7xl">
      {/* Encabezado Funcional */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100 dark:border-gray-800">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 rounded-2xl mt-1 shrink-0">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-gray-50 font-sans tracking-tight uppercase italic">
              Artículos del Blog
            </h1>
            <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mt-0.5">
              Panel Administrativo de Redacción y Gestión de Contenido
            </p>
          </div>
        </div>

        <a
          href="/admin/blog/crear"
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl active:scale-95"
        >
          <Plus size={16} /> Redactar Artículo
        </a>
      </div>

      {/* TODO: Aquí inyectarías tu componente de Filtros de búsqueda (PostFilters.tsx) */}

      {/* Tabla Central */}
      <main className="w-full">
        <PostTable posts={posts} isLoading={isLoading} />
      </main>

      {/* Overlays Pasivos Operacionales */}
      <PostPreviewDrawer />
      <DeletePostModal />
    </div>
  );
}
