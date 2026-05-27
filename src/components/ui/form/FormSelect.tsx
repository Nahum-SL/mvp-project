// src/components/ui/form/FormSelect.tsx
"use client";

import { useFormContext, type FieldValues, type Path } from "react-hook-form";

import { cn } from "@/src/lib/utils";
import { FormError } from "./FormError";

interface SelectOption {
  value: string | number;
  label: string;
}

interface Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Componente de select para formularios, estilizado con Tailwind y compatible con react-hook-form
export function FormSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  options,
  placeholder = "Selecciona una opción...",
  disabled,
  className,
}: Props<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full">
      <div className="relative">
        <select
          {...register(name)}
          disabled={disabled}
          className={cn(
            "w-full bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 text-sm font-semibold text-slate-700 outline-none transition-all appearance-none cursor-pointer",
            "focus:ring-2 focus:ring-blue-100 focus:border-slate-300",
            error && "border-red-500 bg-red-50/30",
            className,
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <FormError message={error} />
    </div>
  );
}
