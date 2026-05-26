// features/admin/unete/table/CandidateRow.tsx
"use client";

import { cn } from "@/src/lib/utils";
import { FileText, Edit3, Briefcase, User } from "lucide-react";

import { STATUS_STYLES_UNETE } from "@/src/lib/const/status-themes";

import { useUneteActions } from "../store/unete.selector";
import type { JobApplication } from "@/src/types/unete/unete-types";

interface Props {
  candidate: JobApplication;
}

export function CandidateRow({ candidate }: Props) {
  const { openStatusModal } = useUneteActions();

  return (
    <tr className="group border-b border-slate-100 dark:border-gray-800/60 hover:bg-slate-50/50 dark:hover:bg-gray-800/20 transition-colors">
      {/* Candidato */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 rounded-xl flex items-center justify-center font-bold">
            <User size={16} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-gray-100 text-sm">
              {candidate.fullName}
            </h4>
            <p className="text-xs text-slate-400 dark:text-gray-500 font-medium">
              DNI: {candidate.dni} • {candidate.age} años
            </p>
          </div>
        </div>
      </td>

      {/* Puesto & Experiencia */}
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
            <Briefcase size={14} className="text-slate-400" />
            {candidate.position}
          </span>
          <span className="text-xs text-slate-400 dark:text-gray-500 font-medium mt-0.5">
            {candidate.experience} {candidate.experience === 1 ? "año" : "años"}{" "}
            de experiencia
          </span>
        </div>
      </td>

      {/* Contacto */}
      <td className="py-4 px-6">
        <div className="flex flex-col text-xs font-medium text-slate-600 dark:text-gray-400 space-y-0.5">
          <span className="text-slate-800 dark:text-gray-200 font-semibold">
            {candidate.email}
          </span>
          <span>{candidate.phone}</span>
        </div>
      </td>

      {/* Currículum Vitae (Enlace Seguro) */}
      <td className="py-4 px-6">
        <a
          href={candidate.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-xl transition-colors border border-blue-100/50 dark:border-blue-900/30 group/link"
        >
          <FileText
            size={14}
            className="group-hover/link:scale-105 transition-transform"
          />
          Ver PDF
        </a>
      </td>

      {/* Estado (Badge) */}
      <td className="py-4 px-6">
        <span
          className={cn(
            "inline-flex px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider border rounded-full italic",
            STATUS_STYLES_UNETE[candidate.status],
          )}
        >
          {candidate.status}
        </span>
      </td>

      {/* Acciones */}
      <td className="py-4 px-6 text-right">
        <button
          onClick={() =>
            openStatusModal({ id: candidate.id, status: candidate.status })
          }
          type="button"
          className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl transition-all"
          title="Cambiar Estado de Postulación"
        >
          <Edit3 size={16} />
        </button>
      </td>
    </tr>
  );
}
