// src/hooks/useServices.ts
// Este hook centralizará la lógica de fetching,
// el manejo de errores y los estados de carga,
// asegurando que el ServiceDashboard sepa exactamente
// cuándo mostrar el Skeleton.

"use client";

import { useState, useEffect } from "react";
import { ScoredService } from "../types/servicio/scoring.types";
import { ServiceFilters } from "../types/servicio/servicio";
import { API_URL } from "@/src/lib/api-url";

export const useServices = (filters: ServiceFilters) => {
  const [services, setServices] = useState<ScoredService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (filters.businessType)
        params.append("businessType", filters.businessType);
      if (filters.painPoint) params.append("painPoint", filters.painPoint);
      if (filters.search) params.append("search", filters.search);

      const response = await fetch(
        `${API_URL}/api/servicio/scored?${params.toString()}`,
      );

      const data = await response.json();
      setServices(data);
      setIsLoading(false);
    };

    fetchServices();
  }, [filters]);

  return { services, isLoading };
};
