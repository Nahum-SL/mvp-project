// src/components/ui/layout/servicios/ServiceGrid.tsx

"use client";

import { ServiceCard } from "./ServiceCard";
import { ServiceFilters } from "@/src/types/servicio/servicio";
import { motion, AnimatePresence } from "framer-motion";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { useMemo } from "react";

interface Props {
  services: ScoredService[];
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
}: Props) => {
  const highlightedSet = useMemo(
    () => new Set(highlightedIds),
    [highlightedIds],
  );

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {services.map((svc) => (
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
              highlightLevel={highlightedSet.has(svc.id) ? "high" : "none"}
              matchScore={svc.relevanceScore}
            />{" "}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
