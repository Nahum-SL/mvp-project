// src/features/public-pages/blog/components/tools/PenaltyCalc.tsx
//
// EXPORTADO --> src/features/public-pages/blog/components/BlogSidebar.tsx
// CALCULAR - SIMULADOR DE MULTAS
"use client";
import { useState } from "react";
import { FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";
import { PERU_CONSTANTS } from "@/src/lib/peru-constants";
import { ToolSmartAd } from "./ToolSmartAd";
import { cn } from "@/src/lib/utils";
import { usePersistedState } from "@/src/hooks/usePersistedState";

export const PenaltyCalc = () => {
  const [regimen, setRegimen] = usePersistedState<"mype" | "general">("asescon_penalty_regimen","general");
  const [subsanado, setSubsanado] = useState<boolean>(true);

  const calculatePenalty = () => {
    const uit = PERU_CONSTANTS.UIT_2026;
    // Simplificación: Infracción Art. 176 numeral 1 (No presentar declaraciones)
    let baseMulta = regimen === "general" ? uit * 1 : uit * 0.5;

    if (subsanado) {
      baseMulta =
        baseMulta * (1 - PERU_CONSTANTS.GRADUALIDAD_SUBSANACION_VOLUNTARIA);
    }

    return baseMulta.toFixed(2);
  };

  const currentMulta = Number(calculatePenalty());

  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-[2.5rem] 
    p-8 shadow-2xl relative flex flex-col justify-between overflow-hidden"
    >
      {/* Glow decorativo de advertencia */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />

      <div>
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-3 bg-amber-500/10 rounded-2xl">
            <FaExclamationTriangle className="text-amber-500" />
          </div>
          <h3 className="text-xl font-extrabold text-white uppercase tracking-tighter">
            Simulador <span className="text-amber-500">Multas SUNAT</span>
          </h3>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="group">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase ml-2 mb-1 block">
              Régimen de la Empresa
            </label>
            <div
              className="grid grid-cols-2 gap-2 p-1 bg-slate-950 
            rounded-2xl border border-slate-800"
            >
              <button
                onClick={() => setRegimen("mype")}
                className={`py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${regimen === "mype" ? "bg-amber-500 text-slate-950" : "text-slate-500 hover:text-slate-300"}`}
              >
                MYPE / RER
              </button>
              <button
                onClick={() => setRegimen("general")}
                className={`py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${regimen === "general" ? "bg-amber-500 text-slate-950" : "text-slate-500 hover:text-slate-300"}`}
              >
                R. General
              </button>
            </div>
          </div>

          <button
            onClick={() => setSubsanado(!subsanado)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 group hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  subsanado
                    ? "bg-green-500/20 text-green-500"
                    : "bg-slate-800 text-slate-500",
                )}
              >
                1
                <FaShieldAlt size={14} />
              </div>
              <span className="text-[13px] font-bold text-slate-300 uppercase tracking-tight text-left leading-tight">
                ¿Subsanación Voluntaria? <br />
                <span className="text-[12px] text-slate-500 font-medium lowercase">
                  Aplica descuento del{" "}
                  <span className="text-amber-50 text-[13px]">90</span>
                  <span className="text-amber-400">%</span>
                </span>
              </span>
            </div>
            <div
              className={cn(
                "w-10 h-6 rounded-full relative transition-colors",
                subsanado ? "bg-green-600" : "bg-slate-700",
              )}
            >
              <div
                className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  subsanado ? "left-5" : "left-1",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-amber-500/5 p-6 rounded-3xl border border-amber-500/20">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[9px] text-amber-500/70 font-extrabold uppercase tracking-[0.2em]">
              Costo de Infracción
            </span>
            <span className="text-[10px] text-slate-500 font-bold italic">
              UIT 2026: S/ {PERU_CONSTANTS.UIT_2026}
            </span>
          </div>
          <p className="text-4xl font-extrabold text-white tracking-tighter">
            S/ {calculatePenalty()}
          </p>
        </div>

        {/* Recomendación basada en el monto */}
        <ToolSmartAd
          condition={currentMulta > 500}
          text="Las multas de SUNAT crecen con intereses moratorios diarios. Evita el embargo de cuentas."
          link="/servicio/defensa-tributaria?from=calculadora_multas"
          label="Solicitar defensa fiscal"
        />
        <ToolSmartAd
          condition={!subsanado}
          text="Si SUNAT te notifica primero, pierdes el beneficio del 90% de descuento."
          link="/servicio/auditoria-preventiva?from=calculadora_multas"
          label="Evitar multas ahora"
        />
      </div>
    </div>
  );
};
