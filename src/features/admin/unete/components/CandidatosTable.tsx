// src/features/admin/unete/components/CandidatosTable.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle, Calendar, XCircle, Filter } from "lucide-react";
import { useTransition, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { JobAppStatus } from "@/src/types/unete/unete";
import { StatusBadge } from "./StatusBadge";
import { updateCandidatoStatus } from "../action";
import { cn } from "@/src/lib/utils";

interface Candidato {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: number;
  cvUrl: string;
  status: JobAppStatus; // Usamos los datos del ENUM
  createdAt: string;
}

export const CandidatosTable = ({ data }: { data: Candidato[] }) => {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<JobAppStatus | "TODOS">("TODOS");

  // Lógica de filtrado
  const filteredData = data.filter((c) =>
    filter === "TODOS" ? true : c.status === filter
  );

  const handleUpdateStatus = (id: number, status: JobAppStatus) => {
    startTransition(async () => {
      const result = await updateCandidatoStatus(id, status);
      if (result.success) {
        toast.success(`Estado actualizado a ${status.toLowerCase()}`);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* --- SELECTOR DE FILTROS --- */}
      <div className="flex items-center justify-between bg-white/50 p-2 rounded-3xl border border-slate-100 backdrop-blur-sm">
        <div className="flex gap-1">
          {["TODOS", ...Object.values(JobAppStatus)].map((s) => (
            <button
              key={s}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setFilter(s as any)}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-tighter rounded-2xl transition-all",
                filter === s 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                  : "text-slate-400 hover:bg-slate-100"
              )}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <Filter size={12} /> {filteredData.length} Candidatos
        </div>
      </div>

      {/* --- TABLA --- */}
      <div className="w-full overflow-x-auto bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Postulante</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Puesto / Exp.</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Fecha</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence mode="popLayout">
              {filteredData.map((candidato, index) => (
                <motion.tr
                  key={candidato.id}
                  layout // Hace que las filas se deslicen suavemente al cambiar el filtro
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
                        <p className="text-sm font-bold text-slate-900">{candidato.fullName}</p>
                        <p className="text-xs text-slate-500">{candidato.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-700">{candidato.position}</p>
                    <p className="text-xs text-slate-400 font-bold tracking-tighter italic">{candidato.experience} AÑOS EXP.</p>
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
                    <StatusBadge status={candidato.status} />
                  </td>

                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-1">
                      {/* BOTÓN REVISADO */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateStatus(candidato.id, JobAppStatus.REVISADO)}
                        disabled={isPending || candidato.status === JobAppStatus.REVISADO}
                        className={cn(
                          "p-2 rounded-xl transition-all",
                          candidato.status === JobAppStatus.REVISADO 
                            ? "text-emerald-600 bg-emerald-50" 
                            : "text-slate-300 hover:text-emerald-600 hover:bg-emerald-50"
                        )}
                      >
                        <CheckCircle size={18} className={cn(isPending && candidato.status !== JobAppStatus.REVISADO && "animate-spin")} />
                      </motion.button>

                      {/* BOTÓN RECHAZAR */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateStatus(candidato.id, JobAppStatus.RECHAZADO)}
                        disabled={isPending || candidato.status === JobAppStatus.RECHAZADO}
                        className={cn(
                          "p-2 rounded-xl transition-all",
                          candidato.status === JobAppStatus.RECHAZADO 
                            ? "text-rose-600 bg-rose-50" 
                            : "text-slate-300 hover:text-rose-600 hover:bg-rose-50"
                        )}
                      >
                        <XCircle size={18} />
                      </motion.button>

                      <a href={candidato.cvUrl} target="_blank" className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <FileText size={18} />
                      </a>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="p-20 text-center text-slate-300 uppercase font-black tracking-widest text-xs italic">
            No hay registros en esta categoría
          </div>
        )}
      </div>
    </div>
  );
};