"use client";
import { motion } from "framer-motion";

export const EyeIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Contorno del ojo */}
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />

      {/* Pupila */}
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        animate={{ scale: isOpen ? 1 : 0.8 }}
      />

      {/* Párpado (Animación de parpadeo) */}
      <motion.path
        d={
          isOpen
            ? "M2 12s3-7 10-7 10 7 10 7" // Abierto
            : "M2 12c3 0 10 0 10 0" // Cerrado
        }
        initial={false}
        animate={
          isOpen
            ? {
                d: [
                  "M2 12s3-7 10-7 10 7 10 7", // Inicio: Abierto
                  "M2 12c3 0 10 0 10 0", // Medio: Cerrado (parpadeo)
                  "M2 12s3-7 10-7 10 7 10 7", // Fin: Abierto
                ],
              }
            : { d: "M2 12c3 0 10 0 10 0" }
        } // Si no está en modo Zen, se mantiene cerrado o cambia de icono
        transition={{
          duration: 0.2,
          ease: "easeInOut",
          repeat: isOpen ? Infinity : 0, // Repetir infinitamente solo si está abierto
          repeatDelay: 4.8, // Espera 4.8 segundos entre parpadeos (total ciclo 5s)
        }}
      />
    </svg>
  );
};
