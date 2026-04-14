"use client";

import { useState, useSyncExternalStore } from "react";
import { cn } from "@/src/lib/utils";
import { getDynamicDeadline } from "@/src/utils/sunat";
import Link from "next/link";
import SunatScheduleTable from "./SunatScheduleTable";
import { useNow } from "@/src/lib/useNow";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => "";
const getClientSnapshot = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("asescon_last_ruc_digit") || "";
};

export default function SunatToolPro() {
  const storedDigit = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  // Estado temporal para cuando el usuario está escribiendo un nuevo dígito
  const [tempDigit, setTempDigit] = useState<string | null>(null);

  // El dígito actual es el del store, a menos que el usuario esté escribiendo uno nuevo
  const now = useNow();
  // El valor que se muestra en el input y se usa para el cálculo
  const rawDigit = tempDigit ?? storedDigit ?? "";
  // Aseguramos que siempre sea un solo dígito numérico
  const digit = rawDigit ? rawDigit.slice(-1) : "";
  const deadline = getDynamicDeadline(digit, now);

  const handleChange = (val: string) => {
    const d = val.slice(-1);
    setTempDigit(d);
    localStorage.setItem("asescon_last_ruc_digit", d);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-4xl
      p-5 md:p-10 relative overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 to-transparent blur-3xl opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 md:mb-10">
          <h3 className="text-2xl md:text-4xl font-semibold">
            Consulta tu fecha límite
          </h3>
          <p className="text-slate-400 text-sm md:text-sm md:mt-1 mt-2">
            Basado en tu último dígito del RUC
          </p>
        </div>

        {/* INPUT */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <label className="text-xs text-slate-500 uppercase">
              Último dígito
            </label>

            <input
              type="number"
              value={digit}
              onChange={(e) => handleChange(e.target.value)}
              className="
              w-full mt-2 py-4 md:py-6 text-2xl md:text-4xl text-center
              bg-slate-950 border border-slate-800 rounded-2xl
            text-white outline-none focus:border-sky-500/50
            "
              placeholder="0"
            />
          </div>

          {/* RESULT */}
          <div className="flex-1">
            <label className="text-xs text-slate-500 uppercase">
              Fecha límite
            </label>

            <div
              className={cn(
                "mt-2 h-full flex items-center justify-center",
                "bg-slate-950 border border-slate-800 rounded-2xl",
                "text-3xl font-semibold text-sky-400",
              )}
            >
              {deadline}
            </div>
          </div>
        </div>

        <SunatScheduleTable
          selectedDigit={digit}
          schedule={{
            "0": 15,
            "1": 16,
            "2": 17,
            "3": 18,
            "4": 19,
            "5": 20,
            "6": 21,
            "7": 22,
            "8": 23,
            "9": 24,
          }}
          onSelectDigit={(d) => handleChange(d)}
        />

        {/* STATUS */}
        {digit && (
          <div className="mt-6 flex items-center gap-2 text-slate-500">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest">
              Guardado automáticamente
            </span>
          </div>
        )}

        {/* SMART INSIGHT */}
        {digit && (
          <div className="mt-8 p-5 bg-sky-500/5 border border-sky-500/20 rounded-2xl">
            <p className="text-sm text-slate-300">
              Si declaras fuera de esta fecha, podrías recibir multas
              automáticas de SUNAT.
            </p>

            <Link
              href="/servicio/asesoria-contable"
              className="inline-block mt-3 text-sky-400 text-xs font-bold uppercase tracking-widest hover:text-sky-300"
            >
              Evitar multas
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
