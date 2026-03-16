// src/components/ui/layout/servicios/ServiceGrid.tsx

"use client";

// Para optimizar los resultados que se muestren
import { useMemo } from "react";
// Card del Servicio
import { ServiceCard } from "./ServiceCard";
// Manejar el score con logica matematica
import { calculateServiceScore } from "@/src/lib/scoring";
// Types
import { Service } from "@/src/types/servicio/servicio";
import { ServiceFilters } from "@/src/types/servicio/servicio";
// Animaciones
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  services: Service[];
  onCompare: (id: number) => void;
  compareIds: number[];
  highlightedIds: number[];
  filters: ServiceFilters;
}

export const ServiceGrid = ({
  services,
  onCompare,
  compareIds,
  highlightedIds,
  filters,
}: Props) => {
  // Para mejorar la UX
  const sortedServices = useMemo(() => {
    return [...services].sort((a, b) => {
      const scoreA = calculateServiceScore(a, filters);
      const scoreB = calculateServiceScore(b, filters);
      return scoreB - scoreA;
    });
  }, [services, filters]);

  return (
    // La propiedad Layout ademas de animar la entrada y salida, 
    // calcula las coordenadas de cada tarjeta y las desplaza suavemente, 
    // si su indice en el array cambio
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {sortedServices.map((svc) => {
          // Se le añaden los paramatros para que haga el calculo
          const score = calculateServiceScore(svc, filters);

          return (
            <ServiceCard
              key={svc.id}
              service={svc}
              onCompare={() => onCompare(svc.id)}
              isComparing={compareIds.includes(svc.id)}
              highlighted={highlightedIds.includes(svc.id)}
              matchScore={score}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
