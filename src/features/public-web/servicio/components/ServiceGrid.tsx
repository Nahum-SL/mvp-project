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

  const sortedServices = useMemo(() => {
    return [...services].sort((a, b) => {
      // prioridad: recomendados primero
      const aHighlighted = highlightedIds.includes(a.id) ? 1 : 0;
      const bHighlighted = highlightedIds.includes(b.id) ? 1 : 0;

      if (aHighlighted !== bHighlighted) {
        return bHighlighted - aHighlighted;
      }

      // luego por score
      return b.relevanceScore - a.relevanceScore;
    });
  }, [services, highlightedIds]);

  return (
    <>
      <div className="mb-4 md:mb-6">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
          Servicios que puedes considerar
        </h3>
      </div>
      <motion.div
        layout
        transition={{
          layout: {
            type: "spring",
            stiffness: 120,
            damping: 20,
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {sortedServices.map((svc) => (
            <motion.div
              layout // El layout debe ir en el contenedor inmediato del map
              key={svc.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                },
                delay: 1 * 0.03,
              }}
            >
              <ServiceCard
                service={svc}
                onCompare={() => onCompare(svc.id)}
                isComparing={compareIds.includes(svc.id)}
                highlightLevel={highlightedSet.has(svc.id) ? "high" : "none"}
                matchScore={svc.relevanceScore}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
