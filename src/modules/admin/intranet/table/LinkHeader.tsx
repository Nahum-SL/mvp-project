// features/admin/intranet/form/LinkHeader.tsx
"use client";

import { Plus, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function LinkHeader() {
  const router = useRouter();

  const handleCreateClick = () => {
    // Redirección al formulario de creación o puedes abrir un modal de creación aquí
    router.push("/admin/intranet/crear");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100 dark:border-gray-800">
      {/* Títulos Orientativos de la Feature */}
      <div className="flex items-start gap-3">
        <div className="p-3 bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 rounded-2xl mt-1 shrink-0">
          <Link2 size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-gray-50 font-sans tracking-tight uppercase italic">
            Accesos Directos
          </h1>
          <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mt-0.5">
            Gestión de enlaces e integraciones de la Intranet Corporativa
          </p>
        </div>
      </div>

      {/* Botón de Acción Principal para Crear */}
      <button
        onClick={handleCreateClick}
        type="button"
        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-200 group outline-none active:scale-95 shrink-0"
      >
        <Plus
          size={16}
          className="transition-transform group-hover:rotate-90 duration-200"
        />
        Nuevo Enlace
      </button>
    </div>
  );
}
