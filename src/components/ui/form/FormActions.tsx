"use client";

import Link from "next/link";
import { Loader2, Save, ArrowLeft } from "lucide-react";

interface Props {
  isPending?: boolean;
  isEditing?: boolean;

  submitLabel?: string;
  loadingLabel?: string;

  cancelHref?: string;
}

export function FormActions({
  isPending = false,
  isEditing = false,

  submitLabel,
  loadingLabel = "Guardando...",

  cancelHref = "/admin",
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="submit"
        disabled={isPending}
        className="
          w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
          text-white font-extrabold py-4 rounded-2xl
          shadow-xl shadow-blue-200 transition-all
          flex items-center justify-center gap-3
          uppercase text-sm tracking-widest
        "
      >
        {isPending ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <Save size={20} />
        )}

        {isPending
          ? loadingLabel
          : submitLabel || (isEditing ? "Actualizar" : "Crear")}
      </button>

      <Link
        href={cancelHref}
        className="
          w-full bg-white text-slate-500 font-bold py-4 rounded-2xl
          border border-slate-200 hover:bg-slate-50 transition-all
          flex items-center justify-center gap-3 uppercase
          text-xs tracking-widest text-center
        "
      >
        <ArrowLeft size={16} />
        Cancelar
      </Link>
    </div>
  );
}
// ==================
// REUSABLE EN => 
// ==================
// Posts
// Servicios
// Intranet
// Categoria
// Productos
// Contactos