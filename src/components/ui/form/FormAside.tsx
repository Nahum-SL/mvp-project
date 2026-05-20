import { cn } from "@/src/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function FormAside({ children, className }: Props) {
  return (
    <aside
      className={cn(
        "bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 sticky top-6",
        className,
      )}
    >
      {children}
    </aside>
  );
}
