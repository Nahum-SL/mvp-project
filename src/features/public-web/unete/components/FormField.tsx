// features/public-pages/unete/components/FormField.tsx
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/src/lib/utils";

interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  isSelect?: boolean;
  children?: React.ReactNode;
}

// --- ABARCA ---:
// Nombres Completos (fullName)
// DNI (dni)
// Edad (age)
// Email (email)
// Telefono (phone)
// Años de experiencia (experience)
// Puesto de interes (postion)

export const FormField = ({
  label,
  placeholder,
  type = "text",
  registration,
  error,
  isSelect,
  children,
}: FormFieldProps) => {
  const inputClasses = `w-full bg-white border 
  ${error ? "border-red-500" : "border-slate-200"} rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`;

  return (
    <div className={cn(isSelect ? "" : "space-y-2", "flex flex-col")}>
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
        {label}
      </label>

      {isSelect ? (
        <select {...registration} className={`${inputClasses} appearance-none`}>
          {children}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          className={inputClasses}
        />
      )}

      {error && (
        <p className="text-red-500 text-[10px] mt-1">{error}</p>
      )}
    </div>
  );
};
