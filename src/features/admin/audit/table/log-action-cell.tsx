// src/features/admin/audit/table/log-cells/log-action-cell.tsx
interface LogActionCellProps {
  action: string;
}

export function LogActionCell({ action }: LogActionCellProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-[10px] text-slate-600 uppercase tracking-tighter group-hover:bg-white transition-colors">
      {action.replace(/_/g, " ")}
    </span>
  );
}
