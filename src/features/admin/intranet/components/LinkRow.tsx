// features/admin/intranet/components/LinkRow.tsx
"use client";

import * as Icons from "lucide-react";
import { LucideIcon, Edit3, Trash2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { deleteLinkAction } from "../action";
import { toast } from "sonner";

interface Props {
  link: {
    id: number;
    title: string;
    url: string;
    icon: string | null;
    order: number;
    isVisible: boolean;
  };
}

export const LinkRow = ({ link }: Props) => {
  // Renderizado dinámico del icono
  const IconComponent =
    (Icons[link.icon as keyof typeof Icons] as LucideIcon) || Icons.Link;

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este acceso?")) return;

    const res = await deleteLinkAction(link.id);
    if (res.success) {
      toast.success("Enlace eliminado");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group hover:bg-slate-50/80 transition-colors"
    >
      {/* Columna Orden */}
      <td className="px-8 py-6">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 font-black text-xs italic">
          #{link.order}
        </span>
      </td>

      {/* Columna Info Principal */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            <IconComponent size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 leading-none mb-1 uppercase text-sm tracking-tight italic">
              {link.title}
            </h4>
            <a
              href={link.url}
              target="_blank"
              className="text-[10px] text-slate-400 font-medium hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              {link.url} <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </td>

      {/* Columna Visibilidad */}
      <td className="px-8 py-6">
        <span
          className={cn(
            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic border",
            link.isVisible
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-amber-50 text-amber-600 border-amber-100",
          )}
        >
          {link.isVisible ? "Visible" : "Oculto"}
        </span>
      </td>

      {/* Acciones */}
      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/intranet/editar/${link.id}`}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
          >
            <Edit3 size={18} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};
