"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

type Schedule = Record<string, number>;

interface Props {
  selectedDigit: string;
  schedule: Schedule;
  onSelectDigit: (digit: string) => void;
}

export default function SunatScheduleTable({
  selectedDigit,
  schedule,
  onSelectDigit,
}: Props) {
  const [filter, setFilter] = useState<"all" | "early" | "late">("all");

  // Clasificación UX (valor percibido SaaS)
  const filteredEntries = useMemo(() => {
    return Object.entries(schedule).filter(([_, day]) => {
      if (filter === "early") return day <= 18;
      if (filter === "late") return day > 18;
      return true;
    });
  }, [schedule, filter]);
  
  return (
    <div className="mt-12">
      {/* HEADER + FILTROS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <h4 className="text-sm uppercase tracking-widest text-slate-500">
          Cronograma por dígito
        </h4>

        <div className="flex gap-2">
          {[
            { key: "all", label: "Todos" },
            { key: "early", label: "Tempranos" },
            { key: "late", label: "Tardíos" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={cn(
                "px-3 py-2 text-xs rounded-xl transition-all",
                "min-w-17.5", // importante para dedos
                filter === f.key
                  ? "bg-sky-500 text-black"
                  : "bg-slate-800 text-slate-400 active:scale-95",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLA */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map(([digit, day]) => {
            const isActive = digit === selectedDigit;

            return (
              <motion.div
                key={digit}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                onClick={() => onSelectDigit?.(digit)}
                className={cn(
                "relative p-3 md:p-4 rounded-xl md:rounded-2xl border text-center",
                "transition-all duration-300 active:scale-95",
                isActive
                  ? "bg-sky-500 text-black border-sky-400 shadow-lg shadow-sky-500/20"
                  : "bg-slate-950 border-slate-800 text-slate-400"
                )}
              >
                {/* Glow activo */}
                {isActive && (
                  <div className="absolute inset-0 bg-linear-to-br from-sky-400/20 to-transparent blur-2xl opacity-70 rounded-2xl" />
                )}

                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest opacity-70">
                    Dígito
                  </p>
                  <p className="text-xl md:text-2xl font-bold">{digit}</p>

                  <div className="mt-2 text-xs opacity-70">Vence</div>
                  <p className="text-lg font-semibold">{day}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="mt-10 text-center text-xs text-slate-600">
        Consulta basada en cronograma referencial SUNAT 2026
      </div>

      {/* INSIGHT DINÁMICO */}
      {selectedDigit && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 md:mt-12 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20"
        >
          <p className="text-sm text-slate-300">
            Tu RUC termina en <strong>{selectedDigit}</strong>, por lo tanto tu
            fecha de vencimiento es{" "}
            <span className="text-sky-400 font-semibold">
              {schedule[selectedDigit]}
            </span>
            .
          </p>
        </motion.div>
      )}
    </div>
  );
}
