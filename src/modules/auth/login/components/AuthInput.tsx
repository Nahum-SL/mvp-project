// src/features/auth/components/form/AuthInput.tsx
import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/src/lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  register: UseFormRegisterReturn;
  rightElement?: React.ReactNode; // Para el botón de "ver contraseña"
}

export const AuthInput = ({
  label,
  icon: Icon,
  error,
  register,
  rightElement,
  className,
  ...props
}: AuthInputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
        {label}
      </label>

      <div className="relative group">
        <Icon
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors",
            !error && "group-focus-within:text-blue-500",
          )}
          size={18}
        />

        <input
          {...register}
          {...props}
          className={cn(
            "w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-slate-900 placeholder:text-slate-300",
            error
              ? "border-red-200 focus:ring-2 focus:ring-red-500/10 focus:border-red-500"
              : "border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
            rightElement && "pr-12", // Espacio extra si hay un botón a la derecha
            className,
          )}
        />

        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold uppercase animate-in fade-in slide-in-from-left-1">
          {error}
        </p>
      )}
    </div>
  );
};
