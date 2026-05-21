// features/admin/intranet/components/AdminLinkListSkeleton.tsx
export const LinkListSkeleton = () => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            {["Orden", "Acceso", "Estado", "Acciones"].map((head, i) => (
              <th key={i} className="px-8 py-6">
                <div className="h-3 w-16 bg-slate-200 rounded-full" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {[1, 2, 3, 4, 5].map((row) => (
            <tr key={row}>
              {/* Celda Orden */}
              <td className="px-8 py-6">
                <div className="h-6 w-8 bg-slate-100 rounded-lg" />
              </td>
              {/* Celda Acceso (Icono + Texto) */}
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-200 rounded-md" />
                    <div className="h-3 w-48 bg-slate-100 rounded-md" />
                  </div>
                </div>
              </td>
              {/* Celda Estado */}
              <td className="px-8 py-6">
                <div className="h-6 w-20 bg-slate-100 rounded-full" />
              </td>
              {/* Celda Acciones */}
              <td className="px-8 py-6">
                <div className="flex justify-end gap-2">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                  <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
