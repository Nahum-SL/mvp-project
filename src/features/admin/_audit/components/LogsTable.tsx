// src/features/admin/audit/components/LogsTable.tsx
"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  Info,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { AuditLog } from "@/src/types/audit/audit";

interface Props {
  logs: AuditLog[];
}

const statusConfig = {
  SUCCESS: {
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    label: "Éxito",
  },
  FAILED: {
    icon: ShieldAlert,
    color: "text-red-500",
    bg: "bg-red-50",
    label: "Fallido",
  },
  ERROR: {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    label: "Error",
  },
  INFO: { icon: Info, color: "text-blue-500", bg: "bg-blue-50", label: "Info" },
};

export const LogsTable = ({ logs }: Props) => {
  if (logs.length === 0) {
    return (
      <div className="p-20 text-center text-slate-400">
        <Clock className="mx-auto mb-4 opacity-20" size={48} />
        <p className="text-sm font-medium">
          No se encontraron registros de actividad.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50">
              Evento
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 text-center">
              Estado
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50">
              Detalle del Mensaje
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 text-right">
              Fecha y Hora
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            const config = statusConfig[log.status] || statusConfig.INFO;
            const Icon = config.icon;

            return (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group hover:bg-slate-50/80 transition-all cursor-default"
              >
                <td className="px-6 py-4 border-b border-slate-50">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-[10px] text-slate-600 uppercase tracking-tighter group-hover:bg-white transition-colors">
                    {log.action.replace(/_/g, " ")}
                  </span>
                </td>

                <td className="px-6 py-4 border-b border-slate-50">
                  <div className="flex justify-center">
                    <div
                      className={`p-2 rounded-xl ${config.bg} ${config.color} shadow-sm shadow-current/5`}
                    >
                      <Icon size={16} />
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 border-b border-slate-50">
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed max-w-md">
                    {log.message}
                  </p>
                  {log.metadata && (
                    <span className="text-[9px] text-slate-400 font-mono mt-1 block">
                      ID: {log.id.slice(0, 8)}...
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 border-b border-slate-50 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-bold text-slate-900 tabular-nums">
                      {new Date(log.createdAt).toLocaleDateString("es-PE", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium tabular-nums">
                      {new Date(log.createdAt).toLocaleTimeString("es-PE", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
