// src/features/public/servicio/hooks/use-compare-services.ts
import { useQuery } from "@tanstack/react-query";
import { compareServices } from "../api/compare-services.api";
import type { CompareServicesPayload } from "@/src/types/servicio/recommendation";
import { PUBLIC_SERVICIO_QUERY_KEYS } from "../utils/public-servicios-query-key";

export const useCompareServices = (payload: CompareServicesPayload) => {
  return useQuery({
    queryKey: PUBLIC_SERVICIO_QUERY_KEYS.compare(payload.ids, payload.filters),
    queryFn: () => compareServices(payload),
    enabled: payload.ids.length > 0,
    placeholderData: (previousData) => previousData,
  });
};
