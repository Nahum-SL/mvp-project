// features/admin/blog/post/table/PostRow.tsx
"use client";

import Image from "next/image";
import { Edit3, Trash2, Calendar, User, Eye } from "lucide-react";
import type { BlogPost } from "@/src/types/blog/blogPost";
import { usePostActions } from "../store/post.selectors";

import { cn } from "@/src/lib/utils";

import { TableRow } from "@/src/components/ui/table/TableRow";
import { TableCell } from "@/src/components/ui/table/TableCell";
import { TableButton } from "@/src/components/ui/table/TableButton";

interface Props {
  post: BlogPost;
}

export function PostRow({ post }: Props) {
  const { openDeleteModal, openPreviewDrawer } = usePostActions();

  return (
    <TableRow>
      {/* Miniatura & Info del Artículo */}
      <TableCell>
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/50">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px] uppercase font-bold text-center p-1">
                Sin foto
              </div>
            )}
          </div>
          <div className="min-w-0 max-w-md">
            <h4 className="font-bold text-slate-900 dark:text-gray-100 truncate text-sm group-hover:text-blue-600 transition-colors">
              {post.title}
            </h4>
            <p className="text-[11px] text-slate-400 dark:text-gray-500 font-mono truncate mt-0.5">
              /blog/{post.slug}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Categoría */}
      <TableCell>
        <span className="inline-flex text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/30">
          {post.category?.name || "General"}
        </span>
      </TableCell>

      {/* Estado Publicación */}
      <TableCell>
        <span
          className={cn(
            "inline-flex text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border italic",
            post.published
              ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400"
              : "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400",
          )}
        >
          {post.published ? "Publicado" : "Borrador"}
        </span>
      </TableCell>

      {/* Auditoría Básica (Autor + Fecha) */}
      <TableCell>
        <div className="flex flex-col text-xs text-slate-500 dark:text-gray-400 space-y-0.5 font-medium">
          <span className="flex items-center gap-1 text-slate-700 dark:text-gray-300 font-bold">
            <User size={12} className="text-slate-400" />{" "}
            {post.author?.name || "Admin"}
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Calendar size={12} className="text-slate-400" />{" "}
            {new Date(post.createdAt).toLocaleDateString("es-ES")}
          </span>
        </div>
      </TableCell>

      {/* Panel de Control Acciones */}
      <TableCell align="right">
        <div className="flex items-center justify-end gap-1.5">
          {/* Previsualizar */}
          <TableButton
            onClick={() => openPreviewDrawer(post.id)}
            title="Previsualizar contenido"
          >
            <Eye size={16} />
          </TableButton>

          {/* Editar */}
          <a
            href={`/admin/blog/editar/${post.id}`}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl transition-all"
            title="Editar artículo"
          >
            <Edit3 size={16} />
          </a>

          {/* Eliminar */}
          <TableButton
            onClick={() => openDeleteModal({ id: post.id, title: post.title })}
            title="Eliminar artículo"
          >
            <Trash2 size={16} />
          </TableButton>
        </div>
      </TableCell>
    </TableRow>
  );
}
