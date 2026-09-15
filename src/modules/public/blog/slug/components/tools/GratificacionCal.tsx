// src/features/public-pages/blog/components/tools/GratificacionCalc.tsx
// CALCULAR - CALCULA GRATIFICACIÓN
"use client";
import Link from "next/link";
import { useState } from "react";
// Animacion
import { motion } from "framer-motion";
// Iconos
import { FaCopy, FaCheck, FaCalculator } from "react-icons/fa";
// Constantes legales y tributarias en el Perú
import { PERU_CONSTANTS } from "@/src/lib/peru-constants";
// Recomendacion que aparece en un monto determinado
import { ToolSmartAd } from "./ToolSmartAd";
// hook
import { usePersistedState } from "@/src/hooks/usePersistedState";
import { cn } from "@/src/lib/utils";

const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <motion.p
      key={value}
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      className={cn(
        "text-3xl font-light tracking-tighter",
        value > 10000 ? "text-green-400" : "text-white",
      )}
    >
      S/ {value.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
    </motion.p>
  );
};

export const GratificationCalc = () => {
  const [salary, setSalary] = usePersistedState<number>("asescon_salary", 0);
  const [months, setMonths] = usePersistedState<number>("asescon_months", 6);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    if (!salary) return 0;
    const base = (salary / PERU_CONSTANTS.MESES_SEMESTRE) * months;
    const bonus = base * PERU_CONSTANTS.BONIFICACION_EXTRAORDINARIA;
    return (base + bonus).toFixed(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Mi gratificación estimada es: S/ ${calculate()}. Calculado en ASESCON.`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const result = Number(calculate());

  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 
    shadow-2xl relative flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-500/10 rounded-2xl">
            <FaCalculator className="text-emerald-500" />
          </div>
          <h3 className="text-xl font-extrabold text-white uppercase tracking-tighter">
            Calculadora <span className="text-emerald-500">Gratificación</span>
          </h3>
        </div>

        <div className="space-y-4">
          <div className="group">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase ml-2 mb-1 block">
              Sueldo Mensual Bruto
            </label>
            <input
              type="number"
              value={salary || ""}
              onChange={(e) => setSalary(Number(e.target.value))}
              placeholder="S/ 0.00"
              className="
              w-full bg-slate-950 border border-slate-800 
              group-hover:border-slate-700 rounded-2xl px-5 py-4 
              text-white font-bold outline-hidden transition-all 
              focus:border-emerald-500/50
              "
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase ml-2 mb-1 block">
              Tiempo Laborado (Meses)
            </label>
            <select
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800
              group-hover:border-slate-700 rounded-2xl px-5 py-4 
              text-white font-bold outline-hidden transition-all appearance-none"
            >
              {[6, 5, 4, 3, 2, 1].map((m) => (
                <option key={m} value={m}>
                  {m} Meses
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div
          className="
          flex items-end justify-between 
        bg-slate-950/50 p-6 rounded-3xl 
          border border-slate-800/50
          "
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest">
              Monto Estimado
            </span>
          </div>
          <AnimatedNumber value={result} />

          <button
            onClick={handleCopy}
            title="Copiar"
            className={cn(
              "p-4 rounded-2xl transition-all cursor-pointer",
              copied
                ? "bg-emerald-500 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700",
            )}
          >
            {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
          </button>
        </div>
        <div className="ml-3">
          <p className="text-xs text-slate-500 mt-4">
            Este monto puede variar según tu régimen laboral.
          </p>
          <Link
            href="/herramientas/calculadora-gratificacion"
            className="text-xs text-emerald-400 hover:text-emerald-300 mt-4 inline-block"
          >
            Calculadora avanzada →
          </Link>
        </div>
        {/* Lógica de Recomendación Inteligente */}
        <ToolSmartAd
          condition={salary > 4000}
          text="Podrías estar perdiendo dinero por impuestos mal calculados."
          link="/servicio/planeamiento-tributario?from=calculadora_gratificacion"
          label="Reducir impuestos ahora"
        />
        <ToolSmartAd
          condition={salary > 0 && months < 6}
          text="Los cálculos por periodos truncos requieren validación legal para evitar multas SUNAFIL."
          link="/servicio/asesoria-contable?from=calculadora_gratificacion"
          label="Consultar normativa"
        />
      </div>
    </div>
  );
};
