export default function AdminDashboardLoading() {
  return (
    <div className="space-y-10 pb-10">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-slate-200 animate-pulse rounded-xl" />
          <div className="h-4 w-48 bg-slate-100 animate-pulse rounded-lg" />
        </div>
        <div className="h-12 w-36 bg-slate-200 animate-pulse rounded-2xl" />
      </div>

      {/* Grid de Stats Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4"
          >
            <div className="w-14 h-14 bg-slate-100 animate-pulse rounded-2xl" />
            <div className="space-y-2">
              <div className="h-3 w-16 bg-slate-100 animate-pulse rounded-md" />
              <div className="h-8 w-24 bg-slate-200 animate-pulse rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Sección Inferior Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skeleton del Gráfico */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-2">
              <div className="h-3 w-32 bg-slate-100 animate-pulse rounded-md" />
              <div className="h-6 w-48 bg-slate-200 animate-pulse rounded-lg" />
            </div>
            <div className="h-8 w-32 bg-slate-50 animate-pulse rounded-xl" />
          </div>

          <div className="h-64 flex items-end gap-6 px-4">
            {[80, 40, 100, 60, 90, 50, 70].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-slate-50 animate-pulse rounded-t-xl"
              />
            ))}
          </div>
        </div>

        {/* Skeleton de Acciones Rápidas */}
        <div className="bg-slate-900/5 p-10 rounded-[3rem] border border-slate-100 flex flex-col gap-6">
          <div className="h-8 w-32 bg-slate-200 animate-pulse rounded-lg" />
          <div className="space-y-4 flex-1">
            <div className="h-14 w-full bg-slate-200 animate-pulse rounded-2xl" />
            <div className="h-14 w-full bg-slate-200 animate-pulse rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
