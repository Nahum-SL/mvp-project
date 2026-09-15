"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import BreadcrumbAuto from "./BreadcrumbAuto";

interface Props {
  title: string;
  subtitle?: string;
  backHref?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  backHref,
  badge,
  actions,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <BreadcrumbAuto />

      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        // Eliminamos items-center para que el responsive fluya mejor
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        {/* Contenedor Principal Izquierdo: Título/Subtítulo + Botón Volver */}
        <div className="flex items-start justify-between md:justify-start md:items-center gap-4">
          {/* Bloque de Textos */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight truncate">
                {title}
              </h1>
              {badge}
            </div>

            {subtitle && (
              <p className="text-[13px] md:text-sm text-slate-500 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          {/* Botón Volver: Ahora vive dentro del flex horizontal del título */}
          {backHref && (
            <Link
              href={backHref}
              className="
                p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 
                hover:text-sky-600 hover:border-sky-400 transition-all shadow-sm
              "
            >
              <ArrowLeft size={22} />
            </Link>
          )}
        </div>

        {/* Lado derecho: Acciones (Botones de guardar, etc.) */}
        {actions && (
          <div className="flex items-center gap-3 self-end md:self-center">
            {actions}
          </div>
        )}
      </motion.header>
    </div>
  );
}
