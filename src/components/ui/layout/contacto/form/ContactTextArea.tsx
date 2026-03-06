// src/components/ui/layout/contacto/form/ContactTextArea.tsx
import { MessageSquare } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
}

export const ContactTextArea = ({
  label,
  registration,
  placeholder,
}: Props) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">
      {label}
    </label>
    <div className="relative">
      <MessageSquare
        className="absolute left-4 top-4 text-slate-300"
        size={18}
      />
      <textarea
        {...registration}
        rows={4}
        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-3xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium resize-none"
        placeholder={placeholder}
      />
    </div>
  </div>
);
