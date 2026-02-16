"use client";
import { motion } from "framer-motion";

type Side = "left" | "right";

interface MidnightCardProps {
  title: string;
  subtitle: string;
  description: string;
  textColor?: string;
  side?: Side; // Propiedad para el lado
}

export default function MidnightCard({
  title,
  subtitle,
  description,
  textColor,
  side = "left", // Por defecto a la izquierda
}: MidnightCardProps) {
  // Definimos las clases de alineación basadas en la prop 'side'
  const alignmentClasses =
    side === "left" ? "text-left items-start" : "text-right items-end ml-auto";
  const footerClasses = side === "left" ? "flex-row" : "flex-row-reverse";

  return (
    <article className="flex flex-col justify-between rounded-3xl bg-slate-950 p-10 text-white shadow-[0_20px_50px_rgba(2,6,23,0.3)] transition-all duration-500">
      {/* Contenedor de contenido con alineación dinámica */}
      <div className={`flex flex-col space-y-6 ${alignmentClasses}`}>
        <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase">
          {subtitle}
        </span>

        <h3 className="text-4xl font-black tracking-tighter leading-tight decoration-blue-500/30 underline-offset-8 hover:underline">
          {title}
        </h3>

        <div className={`max-w-xl ${side === "right" ? "ml-auto" : ""}`}>
          <p className="text-slate-400 text-lg leading-relaxed font-light">
            {description}
            {textColor && (
              <span className="block mt-2 text-white font-semibold">
                {textColor}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Footer del card: también se invierte si es 'right' */}
      <div
        className={`mt-12 flex items-center justify-between border-t border-white/10 pt-8 ${footerClasses}`}
      >
        <div
          className={`flex flex-col ${side === "right" ? "items-end" : "items-start"}`}
        >
          <span className="text-[10px] font-black text-white/40 tracking-widest">
            ASESCON
          </span>
          <span className="text-[10px] font-medium text-white/20 uppercase tracking-tighter">
            2026 Strategy Edition
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-white px-8 py-4 text-xs font-black text-slate-950 transition-all hover:bg-blue-50 shadow-xl shadow-white/5 uppercase tracking-widest"
        >
          Descargar
        </motion.button>
      </div>
    </article>
  );
}
