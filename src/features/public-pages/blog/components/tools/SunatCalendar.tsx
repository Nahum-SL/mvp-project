// src/features/public-pages/blog/components/tools/SunatCalendar.tsx
"use client";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

export const SunatCalendar = () => {
  // Inicialización perezosa para evitar re-renders y errores de SSR
  const [rucDigit, setRucDigit] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("asescon_last_ruc_digit") || "";
    }
    return "";
  });

  const handleDigitChange = (val: string) => {
    const digit = val.slice(-1);
    setRucDigit(digit);
    if (typeof window !== "undefined") {
      localStorage.setItem("asescon_last_ruc_digit", digit);
    }
  };

  const getDeadline = (digit: string) => {
    const dates: Record<string, string> = {
      "0": "15 de Marzo",
      "1": "16 de Marzo",
      "2": "17 de Marzo",
      "3": "18 de Marzo",
      "4": "19 de Marzo",
      "5": "20 de Marzo",
      "6": "21 de Marzo",
      "7": "22 de Marzo",
      "8": "23 de Marzo",
      "9": "24 de Marzo",
    };
    return dates[digit] || "Ingresa tu RUC";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
        <FaCalendarAlt size={200} />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-sky-500/10 rounded-2xl">
          <FaCalendarAlt className="text-sky-500" />
        </div>
        <h3 className="text-xl font-black text-white uppercase tracking-tighter">
          Próximos <span className="text-sky-500">Vencimientos</span>
        </h3>
      </div>

      <p className="text-slate-400 text-[13px] font-medium mb-8 leading-relaxed">
        Evita multas de la <span className="text-white font-bold">SUNAT</span>{" "}
        monitoreando tus fechas según el último dígito de tu RUC.
      </p>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-slate-600 uppercase ml-2 tracking-widest">
            Último Dígito
          </span>
          <input
            type="number"
            value={rucDigit}
            onChange={(e) => handleDigitChange(e.target.value)}
            placeholder="0"
            className="w-24 bg-slate-950 border border-slate-800 rounded-2xl py-6 text-white font-black text-center text-3xl focus:border-sky-500/50 outline-hidden transition-all"
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <span className="text-[9px] font-black text-slate-600 uppercase ml-2 tracking-widest">
            Fecha Límite
          </span>
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-6 flex items-center justify-between group-hover:border-slate-700 transition-all">
            <span className="text-sky-400 font-black tracking-tighter text-lg md:text-xl">
              {getDeadline(rucDigit)}
            </span>
          </div>
        </div>
      </div>

      {rucDigit && (
        <div className="mt-6 flex items-center gap-2 text-slate-500">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-widest">
            Dato guardado para tu próxima visita
          </p>
        </div>
      )}
    </div>
  );
};
