// src/components/ui/form/FormSection.tsx
import { cn } from "@/src/lib/utils";

interface Props {
  text?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ text, children, className }: Props) {
  return (
    <div
      className={cn(
        "space-y-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm",
        className,
      )}
    >
      {text && (
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 ml-2 block">
          {text}
        </h3>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
