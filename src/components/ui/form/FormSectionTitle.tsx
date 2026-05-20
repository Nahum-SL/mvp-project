import { cn } from "@/src/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function FormSectionTitle({ children, className }: Props) {
  return (
    <label
      className={cn(
        "text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400",
        className,
      )}
    >
      {children}
    </label>
  );
}
