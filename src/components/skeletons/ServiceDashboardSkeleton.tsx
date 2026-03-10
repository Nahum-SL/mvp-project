// src/components/ui/skeletons/ServiceDashboardSkeleton.tsx
export default function ServiceDashboardSkeleton() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Filtros/Tabs Skeleton */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 w-32 bg-slate-200 animate-pulse rounded-full"
          />
        ))}
      </div>

      {/* Grid de Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-[2.5rem] p-8 border border-slate-100 space-y-6"
          >
            <div className="w-16 h-16 bg-slate-100 animate-pulse rounded-2xl" />
            <div className="space-y-3">
              <div className="h-6 w-3/4 bg-slate-200 animate-pulse rounded-lg" />
              <div className="h-4 w-full bg-slate-100 animate-pulse rounded-lg" />
              <div className="h-4 w-5/6 bg-slate-100 animate-pulse rounded-lg" />
            </div>
            <div className="h-12 w-full bg-slate-50 animate-pulse rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
