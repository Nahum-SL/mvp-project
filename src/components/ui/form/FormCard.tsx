// src/components/ui/form/FormCard.tsx
import { cn } from "@/src/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function FormCard({ children, className }: Props) {
  return (
    <div
      className={cn(
        "p-6 bg-slate-900 rounded-4xl text-white space-y-6 shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
