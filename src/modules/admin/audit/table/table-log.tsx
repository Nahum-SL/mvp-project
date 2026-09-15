// src/features/admin/audit/table/logs-table.tsx
import { Clock } from "lucide-react";
import type { AuditLog } from "@/src/types/audit/audit-types";
import { LOG_COLUMNS } from "./log-columns";
import { LogRow } from "./log-row";

interface LogsTableProps {
  logs: AuditLog[];
}

export function LogsTable({ logs }: LogsTableProps) {
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
    <div className="overflow-x-auto bg-white rounded-4xl border border-slate-100 shadow-sm">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr>
            {LOG_COLUMNS.map((col, idx) => (
              <th
                key={col}
                className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 ${
                  idx === 1 ? "text-center" : idx === 3 ? "text-right" : ""
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <LogRow key={log.id} log={log} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
