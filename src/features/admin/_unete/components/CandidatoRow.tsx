// features/admin/unete/components/CandidatoRow.tsx
"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, Calendar, XCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/src/lib/utils";

import { JobAppStatus } from "../types";
import { JobApplication } from "@/src/types/unete/unete-types";
import { StatusBadge } from "./StatusBadge";

import Link from "next/link";

interface Props {
  candidato: JobApplication;
  index: number;
  isPending: boolean;
  onUpdateStatus: (id: string, status: JobAppStatus) => void;
  onOpenModal: (id: string, status: JobAppStatus) => void;
}

export const CandidatoRow = ({
  candidato,
  index,
  isPending,
  onUpdateStatus,
  onOpenModal,
}: Props) => {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: 20 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group hover:bg-blue-50/30 transition-colors"
    >
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
            {candidato.fullName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              {candidato.fullName}
            </p>
            <p className="text-xs text-slate-500">{candidato.email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <p className="text-sm font-medium text-slate-700">
          {candidato.position}
        </p>
        <p className="text-xs text-slate-400 font-bold tracking-tighter">
          {candidato.experience} AÑOS EXP.
        </p>
      </td>

      <td className="px-6 py-5 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <Calendar size={12} />
          <span className="text-[10px] font-bold uppercase">
            {format(new Date(candidato.createdAt), "dd MMM yy", { locale: es })}
          </span>
        </div>
      </td>

      <td className="px-6 py-5 text-center">
        <StatusBadge status={candidato.status as JobAppStatus} />
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-1">
          {/* Botón Revisado */}
          <ActionButton
            title="Revisado"
            icon={<CheckCircle size={18} />}
            active={candidato.status === JobAppStatus.REVISADO}
            activeClass="text-emerald-600 bg-emerald-50"
            hoverClass="hover:text-emerald-600 hover:bg-emerald-50"
            onClick={() => onUpdateStatus(candidato.id, JobAppStatus.REVISADO)}
            disabled={isPending || candidato.status === JobAppStatus.REVISADO}
            loading={isPending && candidato.status !== JobAppStatus.REVISADO}
          />

          {/* Botón Rechazado */}
          <ActionButton
            title="Rechazado"
            icon={<XCircle size={18} />}
            active={candidato.status === JobAppStatus.RECHAZADO}
            activeClass="text-rose-600 bg-rose-50"
            hoverClass="hover:text-rose-600 hover:bg-rose-50"
            onClick={() => onOpenModal(candidato.id, JobAppStatus.RECHAZADO)}
            disabled={isPending || candidato.status === JobAppStatus.RECHAZADO}
            loading={isPending && candidato.status === JobAppStatus.PENDIENTE} // Opcional
          />

        {/* Botón CV */}
          <Link
            title="Ver CV"
            href={candidato.cvUrl}
            target="_blank"
            className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
          >
            <FileText size={18} />
          </Link>
        </div>
      </td>
    </motion.tr>
  );
};

// Sub-componente interno para limpiar los botones

interface ActionButtonProps {
  title?: string;
  icon: React.ReactNode;
  active: boolean;
  activeClass: string;
  hoverClass: string;
  onClick: () => void;
  disabled: boolean;
  loading?: boolean; // El signo '?' indica que es opcional
}

const ActionButton = (
  {
    title,
    icon,
    active,
    activeClass,
    hoverClass,
    onClick,
    disabled,
    loading,
  }: ActionButtonProps, // <--- Aplicamos la interface aquí
) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      "p-2 rounded-xl transition-all text-slate-300",
      active ? activeClass : hoverClass,
      loading && "animate-spin",
    )}
  >
    {icon}
  </motion.button>
);
