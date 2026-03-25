// src/components/ui/layout/intranet/IntranetNavHint.tsx
import { MousePointerClick } from "lucide-react";

export const IntranetNavHint = () => {
  return (
    <div className="mb-12 flex flex-col items-center lg:items-start space-y-3">
      <div className="flex items-center gap-3">
        {/* Pequeña línea decorativa */}
        <div className="h-px w-8 bg-blue-500/50 hidden lg:block" />

        <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-blue-500">
          Navegación del Sistema
        </span>
      </div>

      <div className="flex items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Seleccione una{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600">
            plataforma de gestión
          </span>
        </h2>

        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 animate-bounce">
          <MousePointerClick size={16} className="text-blue-400" />
        </div>
      </div>

      <p className="text-slate-500 text-sm font-light max-w-md text-center lg:text-left">
        Haga clic en una de las tarjetas para ser redirigido a las herramientas
        internas autorizadas.
      </p>
    </div>
  );
};
