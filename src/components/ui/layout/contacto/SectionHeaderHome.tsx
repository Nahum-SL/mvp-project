"use client";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface Props {
  title: string;
  description?: string;
  lineColor?: "green" | "yellow" | "blue";
  mode?: "light" | "dark"; // Nueva prop para el tema
}

const COLORS = {
  green: "bg-emerald-500",
  yellow: "bg-yellow-400",
  blue: "bg-blue-600",
};

export const SectionHeaderHome = ({
  title,
  description,
  lineColor = "blue",
  mode = "light", // Por defecto en light para no romper donde ya se use
}: Props) => {
  const isDark = mode === "dark";

  return (
    <div className="text-center mb-16 mt-10 space-y-4 px-6">
      {/* Título Principal */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter",
          isDark ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </motion.h2>

      {/* Subtítulo / Descripción */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={cn(
            "text-sm md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed",
            isDark ? "text-slate-400" : "text-slate-500",
          )}
        >
          {description}
        </motion.p>
      )}

      {/* Decoración Visual (Línea Animada) */}
      <div className="flex justify-center pt-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={cn(
            "h-1.5 rounded-full shadow-sm",
            COLORS[lineColor],
            isDark && "shadow-blue-500/20", // Un pequeño brillo si es oscuro
          )}
        />
      </div>
    </div>
  );
};
