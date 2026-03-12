// src/features/admin/servicios/components/ServiciosTable.tsx
"use client";

import { Service } from "@/src/types/servicio/servicio";
import {
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteServicioAction } from "../action";
import { toast } from "sonner";

export const ServiciosTable = ({ initialData }: { initialData: Service[] }) => {
  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "¿Estás seguro de eliminar este servicio? Esta acción borrará la imagen de Cloudinary.",
      )
    )
      return;

    const res = await deleteServicioAction(id);
    if (res.success) toast.success("Servicio eliminado");
    else toast.error(res.error);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-50">
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Servicio
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Target
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Estado
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {initialData.map((svc) => (
            <tr
              key={svc.id}
              className="group hover:bg-slate-50/50 transition-colors"
            >
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className="relative w-12 h-12 rounded-xl 
                  overflow-hidden bg-slate-100 shrink-0"
                  >
                    {svc.image ? (
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
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
                  {svc.businessTypes.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-6">
                {svc.isVisible ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase">
                    <Eye size={14} /> Visible
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-slate-300 text-[10px] font-black uppercase">
                    <EyeOff size={14} /> Oculto
                  </span>
                )}
              </td>
              <td className="p-6">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/servicios/editar/${svc.id}`}
                    className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all hover:shadow-sm"
                  >
                    <Edit3 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(svc.id)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all hover:shadow-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
