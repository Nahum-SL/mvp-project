import BreadcrumbAuto from "../../modules/admin/components/BreadcrumbAuto";
import { cn } from "@/src/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  variant?: "dark" | "flat"; // "dark" para el estilo Intranet, "flat" para Servicios
  actions?: React.ReactNode; // Para el botón de "Nuevo" o cualquier otra acción
  actions2?: React.ReactNode; // Para el botón de "Nuevo" o cualquier otra acción
}

export default function SectionHeader({
  title,
  subtitle,
  icon,
  variant = "flat",
  actions,
  actions2,
}: SectionHeaderProps) {
  const isDark = variant === "dark";

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAuto />

      <header
        className={cn(
          "flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all",
          isDark
            ? "bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl"
            : "py-2",
        )}
      >
        <div className="flex items-center gap-5">
          {/* Contenedor del Icono */}
          <div
            className={cn(
              "p-4 rounded-2xl shadow-lg transition-colors flex items-center justify-center", // Añadí flex para centrar
              isDark
                ? "shadow-blue-500/20 text-sky-400"
                : "bg-white border border-slate-100 text-blue-600 shadow-slate-200/50",
            )}
          >
            {icon}
          </div>

          {/* Textos */}
          <div className="space-y-1">
            <h1
              className={cn(
                "font-extrabold tracking-tighter uppercase leading-none",
                isDark ? "text-2xl" : "text-4xl text-slate-900",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "font-medium tracking-wide",
                isDark
                  ? "text-slate-400 text-[10px] uppercase tracking-widest"
                  : "text-slate-500 text-[10px] md:text-sm font-medium uppercase tracking-widest",
              )}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Espacio para botones (Actions) */}
        <div className="flex items-start justify-between md:justify-start md:items-center gap-4">
          {actions && <div className="flex items-center">{actions}</div>}
          {actions2 && <div className="flex items-center">{actions2}</div>}
        </div>
      </header>
    </div>
  );
}
