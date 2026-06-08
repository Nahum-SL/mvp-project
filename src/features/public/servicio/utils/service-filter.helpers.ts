import { BUSINESS_TYPES, PAIN_POINTS } from "@/src/types/servicio/constants";
import type {
  BusinessTypeID,
  PainPointID,
} from "@/src/types/servicio/constants";

import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

// ==============================
// LABELS
// ==============================

export function getBusinessTypeLabel(businessType?: BusinessTypeID): string {
  if (!businessType) return "Cualquiera";

  return (
    BUSINESS_TYPES.find((item) => item.id === businessType)?.label ??
    "Cualquiera"
  );
}

export function getPainPointLabel(painPoint?: PainPointID): string {
  if (!painPoint) return "Todos los temas";

  return (
    PAIN_POINTS.find((item) => item.id === painPoint)?.label ??
    "Todos los temas"
  );
}

// ==============================
// STATE HELPERS
// ==============================

export function hasActiveFilters(filters: ServiceFilters): boolean {
  return Boolean(
    filters.businessType || filters.painPoint || filters.search?.trim(),
  );
}

export function createEmptyFilters(): ServiceFilters {
  return {
    businessType: undefined,
    painPoint: undefined,
    search: "",
  };
}

export function parseUrlParamsToFilters(
  typeParam: string | null,
  painParam: string | null,
  searchParam: string | null
): ServiceFilters {
  const isValidType = BUSINESS_TYPES.some((b) => b.id === typeParam);
  const isValidPain = PAIN_POINTS.some((p) => p.id === painParam);

  return {
    businessType: isValidType ? (typeParam as BusinessTypeID) : undefined,
    painPoint: isValidPain ? (painParam as PainPointID) : undefined,
    search: searchParam?.trim() ?? "",
  };
}