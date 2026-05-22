// src/features/admin/servicios/components/ServiciosTable.tsx
"use client";

import { Service } from "@/src/types/servicio/servicio-types";
import { Edit3, Trash2, Eye, EyeOff, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { BUSINESS_TYPES } from "@/src/types/servicio/constants";
import { useDeleteServicio } from "../hooks/use-service-mutation";

interface Props {
  initialData: Service[]; // Mantenemos la firma por si el Server Component inyecta la data inicial
}

export const ServiciosTable = ({ initialData }: Props) => {
  // 1. Instanciamos nuestra mutación estructurada
  const { mutate: deleteServicio, isPending: isDeleting } = useDeleteServicio();

  const handleDelete = (id: number) => {
    if (
      !confirm(
        "¿Estás seguro de eliminar este servicio? Esta acción borrará la imagen de Cloudinary.",
      )
    )
      return;

    // 2. Ejecutamos usando los callbacks locales del trigger de disparo para notificaciones UI
    deleteServicio(id, {
      onSuccess: () => {
        toast.success("Servicio eliminado exitosamente");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Ocurrió un Error inesperado",
        );
      },
    });
  };

  // NOTA DE ARQUITECTURA: Aquí deberías consumir `useQuery` si quieres reactividad en tiempo real de lectura.
  // Si tu ruteador de TanStack Start o Next.js ya te provee la data fresca por props ("initialData"), puedes renderizarla directamente.
  const servicios = initialData;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-50">
            <th className="p-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Servicio
            </th>
            <th className="p-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Target
            </th>
            <th className="p-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Estado
            </th>
            <th className="p-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 text-right">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {servicios.map((svc) => (
            <tr
              key={svc.id}
              className="group hover:bg-slate-50/50 transition-colors"
            >
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    {svc.image ? (
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <LayoutGrid size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-none mb-1">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      /{svc.slug}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-6">
                <div className="flex flex-wrap gap-1">
                  {svc.businessTypes.map((id) => {
                    const config = BUSINESS_TYPES.find((t) => t.id === id);
                    return (
                      <span
                        key={id}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-extrabold uppercase rounded-md border border-blue-100"
                      >
                        {config ? config.label : id}
                      </span>
                    );
                  })}
                </div>
              </td>
              <td className="p-6">
                {svc.isVisible ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-extrabold uppercase">
                    <Eye size={14} /> Visible
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-slate-300 text-[10px] font-extrabold uppercase">
                    <EyeOff size={14} /> Oculto
                  </span>
                )}
              </td>
              <td className="p-6">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/servicio/editar/${svc.id}`}
                    className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all hover:shadow-sm"
                  >
                    <Edit3 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(svc.id)}
                    disabled={isDeleting}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {servicios.length === 0 && (
            <tr>
              <td colSpan={4} className="p-20 text-center">
                <div className="flex flex-col items-center gap-2 text-slate-300">
                  <LayoutGrid size={48} strokeWidth={1} />
                  <p className="font-bold uppercase text-[10px] tracking-widest">
                    No hay servicios registrados
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
