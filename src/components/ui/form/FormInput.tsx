"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { FormError } from "./FormError";

interface Props {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: string;
  variant?: "default" | "title"; // 👈 Añadimos variantes para reutilización limpia
}

export function FormInput({
  name,
  placeholder,
  disabled,
  className,
  type = "text",
  variant = "default",
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full">
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          // Variantes de diseño estéticas
          variant === "title" &&
            "w-full bg-transparent text-3xl md:text-4xl font-extrabold border-b-2 border-slate-200 focus:border-blue-600 pb-4 outline-none transition-all",
          variant === "default" &&
            "w-full bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all",
          error &&
            (variant === "title"
              ? "border-red-500"
              : "border-red-500 bg-red-50/30"),
          className,
        )}
      />
      {variant === "default" && <FormError message={error} />}{" "}
      {/* El título suele manejar su error externamente */}
    </div>
  );
}
