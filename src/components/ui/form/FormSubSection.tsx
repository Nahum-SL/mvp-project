import { cn } from "@/src/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function FormSubSection({ children, className }: Props) {
  return (
    <section
      className={cn(
        "bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6",
        className,
      )}
    >
      {children}
    </section>
  );
}
