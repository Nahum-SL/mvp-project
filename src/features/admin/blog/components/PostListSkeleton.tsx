// src/features/admin/blog/components/AdminPostListSkeleton.tsx
export const PostListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-6"
        >
          {/* Miniatura Skeleton */}
          <div className="relative w-24 h-24 rounded-xl bg-slate-100 shrink-0" />

          {/* Contenido Skeleton */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-2">
              {/* Badges de Categoría y Estado */}
              <div className="h-4 w-16 bg-slate-100 rounded-full" />
              <div className="h-4 w-20 bg-slate-50 rounded-full" />
            </div>

            {/* Título */}
            <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />

            {/* Metadatos (Autor y Fecha) */}
            <div className="flex items-center gap-4">
              <div className="h-3 w-24 bg-slate-100 rounded" />
              <div className="h-3 w-20 bg-slate-100 rounded" />
            </div>
          </div>

          {/* Acciones Skeleton */}
          <div className="flex gap-2">
            <div className="w-11 h-11 bg-slate-50 rounded-xl" />
            <div className="w-11 h-11 bg-slate-50 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
