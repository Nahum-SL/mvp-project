// src/components/ui/layout/contacto/form/ContactDateInput.tsx
import { Calendar } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/src/lib/utils";

interface Props {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export const ContactDateInput = ({ label, error, registration }: Props) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">
      {label}
    </label>
    <div className="relative">
      <Calendar
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
        size={18}
      />
      <input
        type="date"
        {...registration}
        className={cn(
          "w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-600",
          error && "ring-2 ring-red-500/20 bg-red-50/50",
        )}
      />
    </div>
    {error && (
      <p className="text-red-500 text-[10px] font-bold italic ml-2 uppercase">
        {error}
      </p>
    )}
  </div>
);
