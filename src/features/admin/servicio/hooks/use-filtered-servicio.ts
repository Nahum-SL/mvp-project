"use client";
import { useMemo } from "react";

import { useServicioFilters } from "../store/servicio.selector";
import { filterServicios } from "../utils/filter-servicios";
import type { Service } from "@/src/types/servicio/servicio-types";

interface Props {
  services: Service[];
}

export function useFilteredServicios({ services }: Props) {
  const filters = useServicioFilters();

  return useMemo(() => {
    return filterServicios({
      services,
      filters,
    });
  }, [services, filters]);
}
