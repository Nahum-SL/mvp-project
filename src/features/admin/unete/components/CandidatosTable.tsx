// src/features/admin/unete/components/CandidatosTable.tsx
"use client";
// Animacion
import { motion } from "framer-motion";
// Iconos
import { FileText, CheckCircle, MoreVertical, Calendar } from "lucide-react";

// Transición con React
import { useTransition } from "react";

// Tratar con las fechas
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Notificaciones
import { toast } from "sonner";

// Traer los datos ENUM
import { JobAppStatus } from "@/src/types/unete/unete";
// Cambio de estado
import { StatusBadge } from "./StatusBadge";
// Accion de actualizar el estado
import { updateCandidatoStatus } from "../action";

// Tratar con los estilos del className
import { cn } from "@/src/lib/utils"; // Tu función de clsx + twMerge

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

  // Conectada con la base de datos
  const handleUpdateStatus = (id: number, status: JobAppStatus) => {
    startTransition(async () => {
      const result = await updateCandidatoStatus(id, status);

      if (result.success) {
        toast("Estado actualizado correctamente");
      } else {
        // Manejar el error
        alert(result.error);
      }
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Postulante
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Puesto / Exp.
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Fecha
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
              Estado
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((candidato, index) => (
            <motion.tr
              key={candidato.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="group hover:bg-blue-50/30 transition-colors"
            >
              {/* Información Personal */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold transition-colors",
                      "group-hover:bg-blue-100 group-hover:text-blue-600",
                    )}
                  >
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

              {/* Puesto y Experiencia */}
              <td className="px-6 py-5">
                <p className="text-sm font-medium text-slate-700">
                  {candidato.position}
                </p>
                <p className="text-xs text-slate-400">
                  {candidato.experience} años de experiencia
                </p>
              </td>

              {/* Fecha de Postulación */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={14} />
                  <span className="text-xs font-medium">
                    {format(new Date(candidato.createdAt), "dd MMM, yyyy", {
                      locale: es,
                    })}
                  </span>
                </div>
              </td>

              {/* Badge de Estado */}
              <td className="px-6 py-5 text-center">
                <StatusBadge status={candidato.status} />
              </td>

              {/* Botones de Acción */}
              <td className="px-6 py-5 text-right">
                <div className="flex justify-end gap-1">
                  <motion.a
                    href={candidato.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                    title="Ver CV PDF"
                  >
                    <FileText size={18} />
                  </motion.a>

                  <motion.button
                    // ... tus props de motion
                    onClick={() =>
                      handleUpdateStatus(candidato.id, JobAppStatus.REVISADO)
                    }
                    disabled={
                      isPending || candidato.status === JobAppStatus.REVISADO
                    }
                    className={cn(
                      "p-2 rounded-xl transition-all",
                      isPending && "opacity-50 cursor-not-allowed",
                      candidato.status === JobAppStatus.REVISADO
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-100",
                    )}
                  >
                    <CheckCircle
                      size={18}
                      className={cn(isPending && "animate-spin")}
                    />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-slate-400 hover:text-slate-900 rounded-xl"
                  >
                    <MoreVertical size={18} />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="p-20 text-center">
          <p className="text-slate-400 italic">
            No hay postulaciones registradas por el momento.
          </p>
        </div>
      )}
    </div>
  );
};
