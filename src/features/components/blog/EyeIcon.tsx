"use client";
import { motion } from "framer-motion";

export const EyeIcon = ({ isOpen }: { isOpen: boolean }) => {
  // Paths completos (Contorno total)
  const pathAbierto = "M2 12C5 5 19 5 22 12C19 19 5 19 2 12Z";
  const pathCerrado = "M2 12C5 12 19 12 22 12C19 12 5 12 2 12Z";

  // Paths de párpados (Líneas individuales)
  const lidAbierto = "M2 12C5 5 19 5 22 12";
  const lidCerrado = "M2 12C5 12 19 12 22 12";
  const bottomAbierto = "M2 12C5 19 19 19 22 12";

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
      className="overflow-visible"
    >
      {/* 1. CONTORNO BASE: Ahora sí cambia entre abierto y cerrado */}
      <motion.path
        d={pathAbierto}
        animate={{ d: isOpen ? pathAbierto : pathCerrado }}
        transition={{ duration: 0.3 }}
        opacity="0.3"
      />

      {/* 2. PUPILA: Se oculta si no está abierto */}
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        fill="currentColor"
        animate={{
          scale: isOpen ? [1, 1.1, 1] : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          scale: {
            repeat: isOpen ? Infinity : 0,
            duration: 4,
            times: [0, 0.5, 1],
          },
          opacity: { duration: 0.2 },
        }}
      />

      {/* 3. PÁRPADO SUPERIOR: El que hace el "blink" */}
      <motion.path
        d={lidAbierto}
        animate={
          isOpen
            ? { d: [lidAbierto, lidCerrado, lidAbierto] }
            : { d: lidCerrado }
        }
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          repeat: isOpen ? Infinity : 0,
          repeatDelay: 3.5,
        }}
      />

      {/* 4. PÁRPADO INFERIOR: Se aplana al cerrar */}
      <motion.path
        d={bottomAbierto}
        animate={{ d: isOpen ? bottomAbierto : lidCerrado }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
};
