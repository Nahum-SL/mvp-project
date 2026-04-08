"use client";

import { useMemo } from "react";

import { useServices } from "@/src/hooks/useServices";
import { SmartSelector } from "../components/selector/SmartSelector";
import { ServiceGrid } from "../components/ServiceGrid";
import { AnimatePresence } from "framer-motion";

import FeaturedRecommendation from "../components/recommendation/FeaturedRecommendation";
import { AIRecommendationLayer } from "../components/recommendation/AIRecommendationLayer";

import { useServiceFilters } from "./ServiceDashboard/hooks/useServiceFilters";
import { useServiceScoring } from "./ServiceDashboard/hooks/useServiceScoring";
import { useRecommendation } from "./ServiceDashboard/hooks/useRecommendation";
import { useComparison } from "./ServiceDashboard/hooks/useComparison";

import { getPriorityScore } from "./ServiceDashboard/utils/priorityScore";
import ComparisonModal from "../components/compare/ComparisonModal";

import { useCompareRecommendation } from "../components/hook/useCompareRecommendation";

export default function ServiceDashboard() {
  const { services, isLoading } = useServices();

  const {
    filters,
    setFilters,
    debouncedFilters,
    isProcessing,
    hasActiveFilters,
  } = useServiceFilters();

  const scoredServices = useServiceScoring({
    services,
    filters: debouncedFilters,
  });

  const { recommendation } = useRecommendation({ filters: debouncedFilters });

  const {
    compareIds,
    toggleCompare,
    selectedServices,
    isModalOpen,
    resetCompare,
  } = useComparison({ services: scoredServices });

  const recommendedServices = useMemo(() => {
    if (!recommendation?.bestMatch) return [];

    return [
      recommendation.bestMatch,
      ...(recommendation.alternatives || []),
    ].map((svc) => ({
      id: svc.id,
      title: svc.title,
      impact: svc.recommendationMeta.impact,
      effort: svc.recommendationMeta.effort,
      risk: svc.recommendationMeta.risk,
      priorityScore: getPriorityScore(svc.recommendationMeta),
    }));
  }, [recommendation]);

  const { data: comparedServices, loading } = useCompareRecommendation({
    ids: compareIds,
    filters: debouncedFilters,
    enabled: isModalOpen,
  });

  const highlightedIds = recommendedServices.map((s) => s.id);

  const isComparing = isModalOpen && compareIds.length === 2;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <SmartSelector
        onFilterChange={setFilters}
        filters={filters}
        isPending={isProcessing || isLoading}
      />

      {hasActiveFilters && recommendation?.bestMatch && (
        <FeaturedRecommendation
          service={recommendation.bestMatch}
          insights={recommendation.insights ?? undefined}
          alternatives={recommendation.alternatives}
        />
      )}

      <AIRecommendationLayer recommendations={recommendedServices} />

      <ServiceGrid
        services={scoredServices}
        onCompare={toggleCompare}
        compareIds={compareIds}
        highlightedIds={highlightedIds}
        filters={filters}
      />

      <AnimatePresence>
        {isComparing && (
          <ComparisonModal
            isOpen={isModalOpen}
            onClose={resetCompare}
            services={
              comparedServices.length ? comparedServices : selectedServices
            }
            hasContext={hasActiveFilters}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
