// src/features/admin/audit/table/log-cells/log-date-cell.tsx
interface LogDateCellProps {
  createdAt: string;
}

export function LogDateCell({ createdAt }: LogDateCellProps) {
  const dateObj = new Date(createdAt);

  const dateStr = dateObj.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
  });

  const timeStr = dateObj.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex flex-col items-end">
      <span className="text-[11px] font-bold text-slate-900 tabular-nums">
        {dateStr}
      </span>
      <span className="text-[10px] text-slate-400 font-medium tabular-nums">
        {timeStr}
      </span>
    </div>
  );
}
