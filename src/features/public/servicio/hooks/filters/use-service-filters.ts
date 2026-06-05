// src/features/public/servicio/hooks/use-service-filters.ts

"use client";

import { useEffect, useState } from "react";

// Types
import type {
  BusinessTypeID,
  PainPointID,
} from "@/src/types/servicio/constants";

import type { ServiceFilters } from "@/src/types/servicio/servicio-types";
import { createEmptyFilters } from "../../utils/service-filter.helpers";

interface UseServiceFiltersOptions {
  initialFilters?: Partial<ServiceFilters>;
  /**
   * Tiempo de debounce para la búsqueda.
   * No afecta businessType ni painPoint.
   */
  debounceMs?: number;
}

export function useServiceFilters({
  initialFilters,
  debounceMs = 300,
}: UseServiceFiltersOptions = {}) {
  const [filters, setFilters] = useState<ServiceFilters>({
    ...createEmptyFilters(),
    ...initialFilters,
  });

  /**
   * Estado local únicamente para el input.
   *
   * Evita disparar consultas mientras el usuario
   * sigue escribiendo.
   */
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput,
      }));
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchInput, debounceMs]);

  const setBusinessType = (businessType?: BusinessTypeID) => {
    setFilters((prev) => ({
      ...prev,
      businessType,
    }));
  };

  const setPainPoint = (painPoint?: PainPointID) => {
    setFilters((prev) => ({
      ...prev,
      painPoint,
    }));
  };

  const clearFilters = () => {
    const empty = createEmptyFilters();

    setFilters(empty);
    setSearchInput("");
  };

  return {
    filters,
    // Search
    searchInput,
    setSearchInput,
    // Selectores
    setBusinessType,
    setPainPoint,
    // Estado global
    setFilters,
    clearFilters,
  };
}
