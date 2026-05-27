  // features/admin/servicio/table/servicio-row.tsx
  "use client";
  import type { Service } from "@/src/types/servicio/servicio-types";
  import {
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    LayoutGrid,
    type LucideIcon,
  } from "lucide-react";
  import Link from "next/link";
  import Image from "next/image";
  import { BUSINESS_TYPES } from "@/src/types/servicio/constants";
  import { iconServiceMap } from "@/src/lib/icons";
  import { useServicioActions } from "../store/servicio.selector";
  import { TableButton } from "@/src/components/ui/table/TableButton";

  interface RowProps {
    svc: Service;
  }

  export function ServiceRow({ svc }: RowProps) {
    const { openDeleteModal, openPreviewDrawer } = useServicioActions();

    // Mapeamos dinámicamente el ícono de Lucide guardado
    const SelectedIcon = (iconServiceMap[
      svc.icon as keyof typeof iconServiceMap
    ] || LayoutGrid) as LucideIcon;

    return (
      <tr className="group hover:bg-slate-50/50 transition-colors">
        <td className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
              {svc.image ? (
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                  <SelectedIcon size={18} className="text-blue-600" />
                </div>
              )}
            </div>
            <div>
              <h3
                onClick={() => openPreviewDrawer(svc.id)}
                className="font-bold text-slate-900 leading-none mb-1 cursor-pointer hover:text-blue-600 hover:underline transition-all"
              >
                {svc.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">/{svc.slug}</p>
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
            <TableButton title="Editar" onClick={() => openPreviewDrawer(svc.id)}>
              <Edit3 size={18} />
            </TableButton>
            <TableButton
              title="Eliminar"
              onClick={() => openDeleteModal({ id: svc.id, title: svc.title })}
              variant="danger"
            >
              <Trash2 size={18} />
            </TableButton>
          </div>
        </td>
      </tr>
    );
  }
