// src/features/admin/audit/table/log-row.tsx
import { motion } from "framer-motion";
import type { AuditLog } from "@/src/types/audit/audit-types";
import { LogActionCell } from "./log-cells/log-action-cell";
import { LogStatusCell } from "./log-cells/log-status-cell";
import { LogDateCell } from "./log-cells/log-date-cell";

interface LogRowProps {
  log: AuditLog;
  index: number;
}

export function LogRow({ log, index }: LogRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.02 }}
      className="group hover:bg-slate-50/80 transition-all cursor-default"
    >
      <td className="px-6 py-4 border-b border-slate-50">
        <LogActionCell action={log.action} />
      </td>

      <td className="px-6 py-4 border-b border-slate-50">
        <LogStatusCell status={log.status} />
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
        <LogDateCell createdAt={log.createdAt} />
      </td>
    </motion.tr>
  );
}
