// features/admin/unete/table/CandidateTable.tsx
"use client";

import type { JobApplication } from "@/src/types/unete/unete-types";
import { CandidateRow } from "./candidato-row";
import { LoadingState } from "@/src/components/ui/states/LoadingState";

interface Props {
  candidates: JobApplication[];
  isLoading: boolean;
}

interface tableHeaderProps {
  label: string;
}

const tableHeaders: tableHeaderProps[] = [
  { label: "Postulante" },
  { label: "Puesto solicitado" },
  { label: "Información de contacto" },
  { label: "Currículum" },
  { label: "Estado" },
  { label: "Acciones" },
] as const;

export function CandidateTable({ candidates, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center bg-white dark:bg-gray-900 rounded-4xl border border-slate-100 dark:border-gray-800 shadow-sm">
        <LoadingState message="Recuperando listado de postulantes..." />
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-gray-900 rounded-4xl border border-slate-100 dark:border-gray-800 shadow-sm text-slate-400 font-medium">
        No se han registrado postulaciones en la bolsa laboral hasta el momento.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-4xl border border-slate-100 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 dark:bg-gray-800/40 border-b border-slate-100 dark:border-gray-800 text-[10px] font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest italic">
              {tableHeaders.map((header, index) => (
                <th key={index} className="py-4 px-6">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-gray-800/40">
            {candidates.map((candidate) => (
              <CandidateRow key={candidate.id} candidate={candidate} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
