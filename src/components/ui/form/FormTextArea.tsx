// components/ui/form/FormTextArea.tsx
"use client";

import { useFormContext, FieldValues, Path } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { FormError } from "./FormError";
import type { LucideIcon } from "lucide-react";

// Añadimos el genérico TFieldValues para inferencia estricta de propiedades
interface Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>; // 🔥 Ahora solo acepta campos reales de tu esquema Zod
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  icon?: LucideIcon;
  showCounter?: boolean; // Nueva prop opcional por si quieres renderizar el contador
}

export function FormTextArea<TFieldValues extends FieldValues = FieldValues>({
  name,
  placeholder,
  disabled,
  className,
  rows = 3,
  icon: Icon,
  showCounter = false,
}: Props<TFieldValues>) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  // 🛡️ Extracción de errores segura tolerante a estructuras complejas o anidadas
  const error = (errors[name as string]?.message as string) || undefined;

  // 👀 Escuchamos el valor en tiempo real solo si el contador está activo (evita re-renders innecesarios)
  const textValue = showCounter ? (watch(name) as string) || "" : "";

  return (
    <div className="w-full space-y-2">
      <div className="w-full relative">
        {Icon && (
          <Icon
            className="absolute left-4 top-4 text-slate-400 pointer-events-none"
            size={18}
          />
        )}
        <textarea
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(
            "w-full p-6 bg-slate-50 rounded-3xl focus:outline-none font-medium text-sm",
            "focus:ring-2 focus:ring-blue-100 border border-transparent resize-none text-slate-600 transition-all",
            Icon ? "pl-12 pr-4" : "px-6", // Ajustado para mantener simetría limpia si no hay ícono
            error &&
              "border-red-500 bg-red-50/30 focus:ring-red-100 text-red-900 placeholder:text-red-300",
            className,
          )}
        />

        {/*  Contador flotante minimalista integrado con tus estilos fluidos */}
        {showCounter && !disabled && (
          <span className="absolute bottom-4 right-4 text-[9px] font-mono font-bold text-slate-300 tracking-wider pointer-events-none bg-white px-2 py-1 rounded-md border border-slate-100 shadow-2xs">
            {textValue.length} CHR
          </span>
        )}
      </div>

      <FormError message={error} />
    </div>
  );
}
