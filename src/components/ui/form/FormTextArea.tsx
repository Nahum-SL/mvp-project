"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { FormError } from "./FormError";
import { LucideIcon } from "lucide-react";

interface Props {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  icon?: LucideIcon;
}

export function FormTextArea({
  name,
  placeholder,
  disabled,
  className,
  rows = 3,
  icon: Icon,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
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
          "w-full p-6 bg-slate-50 rounded-3xl focus:outline-none",
          "focus:ring-2 focus:ring-blue-100 border border-transparent resize-none text-slate-600 transition-all",
          Icon ? "pl-12 pr-4" : "px-4",
          error && "border-red-500 bg-red-50/30 focus:ring-red-100",
          className
        )}
      />
      <FormError message={error} />
    </div>
  );
}