import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

import {
  BUSINESS_TYPES,
  PAIN_POINTS,
  type BusinessTypeID,
  type PainPointID,
} from "@/src/types/servicio/constants";

import { ServiceFilters } from "@/src/types/servicio/servicio-types";

export function useServiceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type");
  const painParam = searchParams.get("pain");

  const [filters, setFilters] = useState<ServiceFilters>({
    businessType: BUSINESS_TYPES.some((t) => t.id === typeParam)
      ? (typeParam as BusinessTypeID)
      : undefined,
    painPoint: PAIN_POINTS.some((p) => p.id === painParam)
      ? (painParam as PainPointID)
      : undefined,
    search: searchParams.get("q") || "",
  });

  const [debouncedFilters] = useDebounce(filters, 300);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedFilters.businessType)
      params.set("type", debouncedFilters.businessType);

    if (debouncedFilters.painPoint)
      params.set("pain", debouncedFilters.painPoint);

    if (debouncedFilters.search) params.set("q", debouncedFilters.search);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, [debouncedFilters, pathname, router]);

  const isProcessing =
    filters.businessType !== debouncedFilters.businessType ||
    filters.painPoint !== debouncedFilters.painPoint ||
    filters.search !== debouncedFilters.search;

  const hasActiveFilters =
    !!debouncedFilters.businessType ||
    !!debouncedFilters.painPoint ||
    !!debouncedFilters.search;

  return {
    filters,
    setFilters,
    debouncedFilters,
    isProcessing,
    hasActiveFilters,
  };
}
