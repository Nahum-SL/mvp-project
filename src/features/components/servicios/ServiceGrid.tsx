// src/components/ui/layout/servicios/ServiceGrid.tsx

"use client";

import { useMemo } from "react";
import { ServiceCard } from "./ServiceCard";
import { calculateServiceScore } from "@/src/utils/scoring";
import { Service, ServiceFilters } from "@/src/types/servicio/servicio";
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
  // 1. Calculamos y ordenamos EN UN SOLO PASO
  const processedServices = useMemo(() => {
    return services
      .map((svc) => ({
        ...svc,
        // Calculamos el score una sola vez aquí
        computedScore: calculateServiceScore(svc, filters),
      }))
      .sort((a, b) => b.computedScore - a.computedScore);
  }, [services, filters]);

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {processedServices.map((svc) => (
          <motion.div
            layout // El layout debe ir en el contenedor inmediato del map
            key={svc.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ServiceCard
              service={svc}
              onCompare={() => onCompare(svc.id)}
              isComparing={compareIds.includes(svc.id)}
              highlighted={highlightedIds.includes(svc.id)}
              matchScore={svc.computedScore} // Usamos el valor ya calculado
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
