// src/features/public-pages/blog/components/tools/SunatCalendar.tsx
"use client";
import { useState, useSyncExternalStore } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { getDynamicDeadline } from "@/src/shared/utils/sunat";
import Link from "next/link";

// 1. Suscriptor externo para el almacenamiento local
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

// 2. Función para leer el valor (evita errores de hidratación)
const getServerSnapshot = () => ""; // En el servidor siempre es vacío
const getClientSnapshot = () =>
  localStorage.getItem("asescon_last_ruc_digit") || "";

export const SunatCalendar = () => {
  // useSyncExternalStore es el hook oficial para sincronizar datos externos (como localStorage)
  // sin causar errores de hidratación ni necesitar useEffects de montaje.
  const rucDigit = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  // Estado
  // local solo para cuando el usuario escribe manualmente
  const [tempDigit, setTempDigit] = useState<string | null>(null);

  // El valor real es el del store, a menos que el usuario esté escribiendo
  const currentDigit = tempDigit !== null ? tempDigit : rucDigit;

  const handleDigitChange = (val: string) => {
    const digit = val.slice(-1);
    setTempDigit(digit); // Actualización instantánea de la UI
    localStorage.setItem("asescon_last_ruc_digit", digit);
    // Notificamos manualmente el cambio
    window.dispatchEvent(new Event("storage"));
  };

  const now = new Date();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
        <FaCalendarAlt size={200} />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-sky-500/10 rounded-2xl">
          <FaCalendarAlt className="text-sky-500" />
        </div>
        <h3 className="text-xl font-extrabold text-white uppercase tracking-tighter">
          Próximos <span className="text-sky-500">Vencimientos</span>
        </h3>
      </div>

      <p className="text-slate-400 text-[13px] font-medium mb-8 leading-relaxed">
        Evita multas de la <span className="text-white font-bold">SUNAT</span>{" "}
        monitoreando tus fechas según el último dígito de tu RUC.
      </p>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-extrabold text-slate-600 uppercase ml-2 tracking-widest">
            Último Dígito
          </span>
          <input
            type="number"
            value={currentDigit}
            onChange={(e) => handleDigitChange(e.target.value)}
            placeholder="0"
            className="w-24 bg-slate-950 border border-slate-800 
            rounded-2xl py-6 text-white font-extrabold text-center 
            text-3xl focus:border-sky-500/50 outline-hidden transition-all"
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <span
            className="text-[9px] font-extrabold text-slate-600 
          uppercase ml-2 tracking-widest"
          >
            Fecha Límite
          </span>
          <div
            className="flex-1 bg-slate-950 border border-slate-800 
          rounded-2xl px-6 flex items-center justify-between 
          group-hover:border-slate-700 transition-all"
          >
            <span className="text-sky-400 font-extrabold tracking-tighter text-lg md:text-xl">
              {getDynamicDeadline(currentDigit, now)}
            </span>
          </div>
        </div>
      </div>

      {currentDigit && (
        <div className="mt-6 flex items-center gap-2 text-slate-500">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <p className="text-[10px] font-extrabold uppercase tracking-widest">
            Dato guardado para tu próxima visita
          </p>
        </div>
      )}
      <p className="text-xs text-slate-500 mt-4">
        Declaración mensual IGV / Renta
      </p>
      <Link
        href="/herramientas/cronograma-sunat"
        className="text-xs text-sky-400 hover:text-sky-300 mt-4 inline-block"
      >
        Ver cronograma completo →
      </Link>
    </div>
  );
};
