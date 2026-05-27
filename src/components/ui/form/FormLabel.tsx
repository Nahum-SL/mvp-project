// src/components/ui/form/FormLabel.tsx
import { cn } from "@/src/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export function FormLabel({ children, className, htmlFor }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400",
        className,
      )}
    >
      {children}
    </label>
  );
}
