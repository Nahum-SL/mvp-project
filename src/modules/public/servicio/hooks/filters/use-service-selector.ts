import { useMemo } from "react";

import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

import {
  getBusinessTypeLabel,
  getPainPointLabel,
  hasActiveFilters,
  createEmptyFilters,
} from "../../utils/service-filter.helpers";

export function useServiceSelector(filters: ServiceFilters) {
  const selectedBusinessLabel = useMemo(
    () => getBusinessTypeLabel(filters.businessType),
    [filters.businessType],
  );

  const selectedPainPointLabel = useMemo(
    () => getPainPointLabel(filters.painPoint),
    [filters.painPoint],
  );

  const isFiltered = useMemo(() => hasActiveFilters(filters), [filters]);

  return {
    selectedBusinessLabel,
    selectedPainPointLabel,
    isFiltered,
    // Útil para acciones de reset dentro del selector
    emptyFilters: createEmptyFilters(),
  };
}
