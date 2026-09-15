// src/features/public/servicio/components/compare/comparison-hybrid.tsx
"use client";

// hooks
import { useComparisonAnalysis } from "../../hooks/compare/use-comparison-analysis";
import { useComparisonBanner } from "../../hooks/compare/use-comparison-banner";

// utils
import { getComparisonMode } from "../../utils/compare/comparison-mode-helper";

// Subcomponentes
import { ComparisonBanner } from "./comparison-banner";
import { ComparisonServiceCard } from "./compare-services-card";
import { ComparisonTable } from "./compare-table";

import type { ScoredService } from "@/src/types/servicio/scoring.types";

interface ComparisonHybridProps {
  services: ScoredService[];
  hasContext?: boolean;
}

export function ComparisonHybrid({
  services,
  hasContext,
}: ComparisonHybridProps) {
  // 1. Hook de análisis general de negocio
  const analysis = useComparisonAnalysis(services, hasContext);

  // 2. Hook especializado en derivar la lógica y datos del banner
  const bannerState = useComparisonBanner(analysis);

  return (
    <div className="space-y-8">
      {/* Banner semántico según el estado del contexto */}
      <ComparisonBanner banner={bannerState} />

      {/* Grid de servicios desacoplado */}
      <div className="grid md:grid-cols-2 gap-6">
        {analysis.services.map((service) => (
          <ComparisonServiceCard
            key={service.id}
            service={service}
            bestScore={analysis.bestScore}
            showAI={analysis.showAI}
            mode={getComparisonMode({
              serviceId: service.id,
              bestServices: analysis.bestServices,
              showAI: analysis.showAI,
              isTie: analysis.isTie,
              hasWinner: analysis.hasWinner,
            })}
          />
        ))}
      </div>

      {/* Matriz comparativa inferior */}
      <ComparisonTable services={analysis.services} />
    </div>
  );
}
