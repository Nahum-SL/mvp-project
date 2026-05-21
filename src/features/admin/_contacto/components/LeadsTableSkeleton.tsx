// src/features/admin/contacto/components/LeadsTableSkeleton.tsx

export const LeadsTableSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Barra de Herramientas / Filtros Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-2 rounded-4xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full h-14 bg-white rounded-2xl border border-slate-50" />
        <div className="flex items-center gap-2 w-full md:w-auto px-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-white rounded-xl border border-slate-50"
            />
          ))}
        </div>
      </div>

      {/* Tabla Principal Skeleton */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <th key={i} className="px-6 py-6">
                    <div className="h-3 w-20 bg-slate-200 rounded-full" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr
                  key={row}
                  className="border-b border-slate-50 last:border-none"
                >
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-slate-100 rounded-md" />
                      <div className="h-3 w-24 bg-slate-50 rounded-md" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="h-3 w-40 bg-slate-100 rounded-md" />
                      <div className="h-3 w-32 bg-slate-50 rounded-md" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-8 w-full bg-slate-50 rounded-lg" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-8 w-24 bg-slate-100 rounded-xl" />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="h-9 w-9 bg-slate-100 rounded-xl ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
