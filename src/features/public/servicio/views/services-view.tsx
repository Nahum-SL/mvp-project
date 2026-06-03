"use client";

import ComparisonModal from "../components/compare/comparison-modal";
import { useCompareServices } from "../hooks/use-compare-services";

import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

interface ComparisonViewProps {
  isOpen: boolean;
  onClose: () => void;
  compareIds: number[];
  filters: ServiceFilters;
  hasContext?: boolean;
}

export function ComparisonView({
  isOpen,
  onClose,
  compareIds,
  filters,
  hasContext,
}: ComparisonViewProps) {
  const { data: services = [] } = useCompareServices({
    ids: compareIds,
    filters,
  });

  if (!compareIds.length) return null;

  return (
    <ComparisonModal
      isOpen={isOpen}
      onClose={onClose}
      services={services}
      hasContext={hasContext}
    />
  );
}
