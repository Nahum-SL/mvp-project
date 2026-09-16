"use client";

import { useState } from "react";
// Componentes
import { ServiceSelector } from "../components/selector/service-selector";
import { ServiceGrid } from "../components/grids/service-grid";
import { CompareFloatingButton } from "../components/compare/compare-floating-button";
// Componentes orquestadores
import { RecommendationView } from "./recommendation-view";
import { ComparisonView } from "./comparison-view";
// Hooks
import { useServiceFilters } from "../hooks/filters/use-service-filters";
import { useScoredServices } from "../hooks/use-scored-services";
// Constants
import { MAX_COMPARE_SERVICES } from "@/src/constants/servicio-public/servicio-ui";
// Utils
import { getHighlightedServices } from "../utils/service-highlight";
// Componente Reutilizable
import ServiceHero from "../components/service-hero";

export function ServicesView() {
  const { filters, setFilters } = useServiceFilters();

  const { data: services = [], isLoading } = useScoredServices(filters);

  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleCompareSelection = (serviceId: number) => {
    setCompareIds((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      }

      if (prev.length >= MAX_COMPARE_SERVICES) {
        return prev;
      }

      return [...prev, serviceId];
    });
  };

  // Obtiene los mejores higlights de 3 servicios comparados
  const highlightedIds = getHighlightedServices(services);

  const hasRecommendationContext =
    !!filters.businessType || !!filters.painPoint;
    
  return (
    <>
      <ServiceHero
        title="Nuestros Servicios"
        subtitle="Soluciones estratégicas diseñadas para blindar y potenciar su organización en el mercado peruano."
      />

      <ServiceSelector
        filters={filters}
        setFilters={setFilters}
        isPending={isLoading}
      />

      <RecommendationView recomendation={filters} />

      <ServiceGrid
        services={services}
        compareIds={compareIds}
        highlightedIds={highlightedIds}
        onCompare={handleCompareSelection}
      />

      {/* Boton para redirigir al modal */}
      {compareIds.length >= 1 && (
        <CompareFloatingButton
          count={compareIds.length}
          onClick={() => setIsCompareOpen(true)}
        />
      )}

      <ComparisonView
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareIds={compareIds}
        filters={filters}
        hasContext={hasRecommendationContext}
      />
    </>
  );
}
