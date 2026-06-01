// src/features/admin/audit/table/log-cells/log-status-cell.tsx
import {
  ShieldCheck,
  ShieldAlert,
  Info,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import type { AuditStatus } from "@/src/types/audit/audit-types";

interface StatusConfig {
  icon: LucideIcon;
  color: string;
  bg: string;
}

const STATUS_CONFIG: Record<AuditStatus, StatusConfig> = {
  SUCCESS: {
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  FAILED: { icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50" },
  ERROR: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
  INFO: { icon: Info, color: "text-blue-500", bg: "bg-blue-50" },
};

export function LogStatusCell({ status }: { status: AuditStatus }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.INFO;
  const Icon = config.icon;

  return (
    <div className="flex justify-center">
      <div
        className={`p-2 rounded-xl ${config.bg} ${config.color} shadow-sm shadow-current/5`}
      >
        <Icon size={16} />
      </div>
    </div>
  );
}
