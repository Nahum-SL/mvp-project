"use client";

import Link from "next/link";
import { ArrowLeft, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  id: string;
}

export default function EditHeaderIntranet({ id }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
      relative overflow-hidden
      rounded-2xl border border-slate-800
      bg-linear-to-br 
      from-[rgba(32,35,91,0.65)]
      to-[rgba(7,9,33,0.8)]
      p-6
      flex flex-col gap-4 md:flex-row md:items-center md:justify-between
      "
    >
      {/* Glow decorativo */}
      <div
        className="
        absolute w-72 aspect-square
        rounded-full blur-3xl opacity-40
        bg-[radial-gradient(circle,#199AFC70_0,#0D102380_100%)]
        "
      />

      {/* Lado izquierdo */}
      <div className="relative flex items-center gap-4">
        {/* Botón volver */}
        <Link
          href="/admin/intranet"
          className="
          flex items-center gap-2
          text-slate-300 hover:text-white
          bg-slate-900/60 hover:bg-slate-800
          border border-slate-700
          px-4 py-2 rounded-xl
          transition
          "
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-semibold hidden sm:inline">Volver</span>
        </Link>

        {/* Título */}
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Editar Acceso
          </h1>

          <span className="text-xs text-sky-400 font-semibold tracking-wider">
            ID #{id}
          </span>
        </div>
      </div>

      {/* Badge modo edición */}
      <div
        className="
        relative flex items-center gap-2
        px-4 py-2
        rounded-xl
        border border-sky-400/20
        bg-sky-500/10
        text-sky-300
        text-xs font-semibold
        tracking-wider
        "
      >
        <Edit3 size={14} />
        Modo edición
      </div>
    </motion.header>
  );
}
