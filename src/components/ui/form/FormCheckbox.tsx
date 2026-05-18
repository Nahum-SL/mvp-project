"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { FormError } from "./FormError";

interface Props {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function FormCheckbox({
  name,
  label,
  disabled,
  className,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className={cn("w-full space-y-1", className)}>
      <label 
        className={cn(
          "flex items-center gap-3 cursor-pointer select-none text-sm font-semibold text-slate-600 transition-colors",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="relative flex items-center">
          <input
            type="checkbox"
            {...register(name)}
            disabled={disabled}
            className={cn(
              "peer h-5 w-5 appearance-none rounded-lg border-2 border-slate-200 bg-slate-50 transition-all cursor-pointer",
              "checked:bg-blue-600 checked:border-blue-600",
              "focus:outline-none focus:ring-2 focus:ring-blue-100",
              disabled && "cursor-not-allowed",
              error && "border-red-500 bg-red-50/30"
            )}
          />
          {/* Icono Check personalizado que aparece solo al estar marcado */}
          <svg
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span>{label}</span>
      </label>
      <FormError message={error} />
    </div>
  );
}