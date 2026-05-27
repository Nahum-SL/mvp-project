// src/components/ui/form/FormInput.tsx
"use client";

import { useFormContext, type FieldValues, type Path } from "react-hook-form";

import { cn } from "@/src/lib/utils";
import { FormError } from "./FormError";

import type { LucideIcon } from "lucide-react";

interface Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: string;
  variant?: "default" | "title";
  icon?: LucideIcon;
}

export function FormInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  placeholder,
  disabled,
  className,
  type = "text",
  variant = "default",
  icon: Icon,
}: Props<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full relative">
      {Icon && variant === "default" && (
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={18}
        />
      )}

      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          variant === "title" &&
            "w-full bg-transparent text-3xl md:text-4xl font-extrabold border-b-2 border-slate-200 focus:border-blue-600 pb-4 outline-none transition-all",

          variant === "default" &&
            "w-full bg-slate-50 rounded-2xl py-3.5 border border-slate-200 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all",

          variant === "default" && Icon ? "pl-12 pr-4" : "px-4",

          error &&
            (variant === "title"
              ? "border-red-500"
              : "border-red-500 bg-red-50/30"),

          className,
        )}
      />

      {variant === "default" && <FormError message={error} />}
    </div>
  );
}
