// src/features/public/servicio/components/grids/service-grid.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ScoredService } from "@/src/types/servicio/scoring.types";
// components
import { ServiceCard } from "../cards/service-card";
// utils
import { sortServicesByRelevance } from "../../utils/service-ranking";
import { getHighlightLevel } from "../../utils/service-highlight";

interface ServiceGridProps {
  services: ScoredService[];
  compareIds: number[];
  highlightedIds: number[];
  onCompare: (serviceId: number) => void;
}

export function ServiceGrid({
  services,
  compareIds,
  highlightedIds,
  onCompare,
}: ServiceGridProps) {
  const sortedServices = sortServicesByRelevance(services, highlightedIds);

  return (
    <section className="min-h-120">
      <div className="mb-4 md:mb-6 mt-9">
        <h3 className="text-sm font-bold text-center text-slate-500 uppercase tracking-wider">
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 py-3"
      >
        <AnimatePresence mode="popLayout">
          {sortedServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                },
              }}
              className="h-full"
            >
              <ServiceCard
                service={service}
                matchScore={service.relevanceScore}
                isComparing={compareIds.includes(service.id)}
                highlightLevel={getHighlightLevel(service.id, highlightedIds)}
                onCompare={() => onCompare(service.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
