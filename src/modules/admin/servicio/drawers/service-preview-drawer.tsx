// features/admin/servicio/drawers/servicio-preview-drawer.tsx
"use client";
import {
  usePreviewDrawer,
  useServicioActions,
} from "../store/servicio.selector";
import { useAdminServiceById } from "../hooks/use-service-queries";
import { X, LayoutGrid, Eye, EyeOff } from "lucide-react";
import { iconServiceMap } from "@/src/lib/icons";

export function ServicePreviewDrawer() {
  const { isOpen, serviceId } = usePreviewDrawer();
  const { closePreviewDrawer } = useServicioActions();

  // Solo se activa si isOpen es verdadero y el id es válido gracias a tu config enabled
  const { data: service, isLoading } = useAdminServiceById(serviceId);

  if (!isOpen) return null;

  const SelectedIcon =
    iconServiceMap[service?.icon as keyof typeof iconServiceMap] || LayoutGrid;

  return (
    <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-50 flex justify-end">
      {/* Backdrop click closer */}
      <div className="absolute inset-0" onClick={closePreviewDrawer} />

      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col p-8 z-10 border-l border-slate-100 overflow-y-auto">
        <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-slate-400" />
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400">
              Vista previa del servicio
            </span>
          </div>
          <button
            type="button"
            onClick={closePreviewDrawer}
            className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-xs font-mono text-slate-400 uppercase tracking-widest">
            Buscando metadatos...
          </div>
        ) : service ? (
          <div className="space-y-8 flex-1">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                <SelectedIcon size={32} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {service.title}
                </h2>
                <p className="text-xs font-mono text-blue-600">
                  /{service.slug}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase border ${
                  service.isVisible
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                {service.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                {service.isVisible ? "Visible en Web" : "Oculto en Web"}
              </span>
              <span className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full text-[9px] font-extrabold text-slate-500 uppercase font-mono">
                Orden Prioridad: {service.order}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Descripción Base
              </h4>
              <div
                className="text-slate-600 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Características / Alcances
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {service.features?.map((f, idx) => (
                  <li
                    key={idx}
                    className="text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center p-10 text-xs text-slate-400 uppercase">
            No se pudo resolver el servicio solicitado.
          </div>
        )}
      </div>
    </div>
  );
}
