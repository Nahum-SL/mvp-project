"use client";

import Link from "next/link";

import { Edit3, ExternalLink, Link as LinkIcon, Trash2 } from "lucide-react";

import { iconMap } from "@/src/lib/icons";
import { cn } from "@/src/lib/utils";

import { TableRow } from "@/src/components/ui/table/TableRow";
import { TableCell } from "@/src/components/ui/table/TableCell";

import type { IntranetLink } from "@/src/types/intranet/intranet-types";

import { useIntranetActions } from "../store/intranet.selector";

interface Props {
  link: IntranetLink;
}

export function LinkRow({ link }: Props) {
  const { openDeleteModal } = useIntranetActions();
    
  const IconComponent =
    link.icon && iconMap[link.icon as keyof typeof iconMap]
      ? iconMap[link.icon as keyof typeof iconMap]
      : LinkIcon;

  return (
    <TableRow>
      {/* Orden */}
      <TableCell>
        <span
          className="inline-flex items-center justify-center
          w-8 h-8 rounded-xl bg-slate-100 text-slate-500
          font-extrabold text-xs italic"
        >
          #{link.order}
        </span>
      </TableCell>

      {/* Información */}
      <TableCell>
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-2xl bg-blue-50 text-blue-600
            group-hover:bg-blue-600 group-hover:text-white
            transition-all shadow-sm"
          >
            <IconComponent size={20} />
          </div>

          <div>
            <h4
              className="font-bold text-slate-900 dark:text-white
              leading-none mb-1 uppercase text-sm tracking-tight italic"
            >
              {link.title}
            </h4>

            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-slate-400 hover:text-blue-600
              flex items-center gap-1 transition-colors"
            >
              {link.url}
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </TableCell>

      {/* Estado */}
      <TableCell>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border",
            link.isVisible
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-amber-50 text-amber-600 border-amber-100",
          )}
        >
          {link.isVisible ? "Visible" : "Oculto"}
        </span>
      </TableCell>

      {/* Acciones */}
      <TableCell align="right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/intranet/editar/${link.id}`}
            className="p-2 text-slate-400 hover:text-blue-600
            hover:bg-blue-50 rounded-xl transition-all"
          >
            <Edit3 size={18} />
          </Link>

          <button
            onClick={() =>
              openDeleteModal({
                id: link.id,
                title: link.title,
              })
            }
            className="p-2 text-slate-400 hover:text-red-600
            hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
