// src/features/public/servicio/hooks/use-service-filters.ts
"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { parseUrlParamsToFilters } from "../../utils/service-filter.helpers";
import type {
  BusinessTypeID,
  PainPointID,
} from "@/src/types/servicio/constants";

type FilterPatch = {
  businessType?: BusinessTypeID | null;
  painPoint?: PainPointID | null;
  search?: string;
};

export function useServiceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () =>
      parseUrlParamsToFilters(
        searchParams.get("type"),
        searchParams.get("pain"),
        searchParams.get("q"),
      ),
    [searchParams],
  );

  const setFilters = (next: Partial<FilterPatch>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Si viene la propiedad, evaluamos si se añade o se elimina de la URL
    if ("businessType" in next) {
      if (next.businessType) params.set("type", next.businessType);
      else params.delete("type");
    }

    if ("painPoint" in next) {
      if (next.painPoint) params.set("pain", next.painPoint);
      else params.delete("pain");
    }

    if ("search" in next) {
      if (next.search?.trim()) params.set("q", next.search.trim());
      else params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { filters, setFilters };
}
