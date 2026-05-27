// src/components/ui/form/FormSection.tsx
import { cn } from "@/src/lib/utils";

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// Componente de sección para formularios, con título opcional y estilizado con Tailwind
export function FormSection({ title, children, className }: Props) {
  return (
    <section
      className={cn(
        "space-y-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm",
        className,
      )}
    >
      {title && (
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
          {title}
        </h3>
      )}

      <div className="space-y-5">{children}</div>
    </section>
  );
}
