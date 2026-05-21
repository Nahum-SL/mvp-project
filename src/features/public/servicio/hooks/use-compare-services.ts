// src/features/public/servicio/hooks/use-compare-services.ts
import { useQuery } from "@tanstack/react-query";
import { compareServices } from "../api/recommendation.api";
import type { CompareServicesPayload } from "@/src/types/servicio/recommendation";

export const useCompareServices = (payload: CompareServicesPayload) => {
  return useQuery({
    // El queryKey debe incluir los ids y filtros para que la caché sepa 
    // exactamente qué combinación de comparación se está guardando.
    queryKey: ["services", "compare", payload.ids, payload.filters],
    
    // Ejecutamos la función pasándole el payload actual
    queryFn: () => compareServices(payload),
    
    // Evitamos que dispare la petición a la API si no hay IDs seleccionados
    enabled: payload.ids.length > 0,
    
    // Opcional: mantiene la data anterior visible mientras carga la nueva comparación
    placeholderData: (previousData) => previousData,
  });
};