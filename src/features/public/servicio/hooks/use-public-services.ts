import { useQuery } from "@tanstack/react-query";
import {
  getPublicServiceBySlug,
  getPublicServices,
} from "../api/servicio-public.api";
import { PUBLIC_SERVICIO_QUERY_KEYS } from "../utils/public-servicios-query";

export function usePublicServices() {
  return useQuery({
    queryKey: PUBLIC_SERVICIO_QUERY_KEYS.all,
    queryFn: getPublicServices,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicServicesBySlug(slug: string) {
  return useQuery({
    queryKey: PUBLIC_SERVICIO_QUERY_KEYS.all,
    queryFn: () => getPublicServiceBySlug(slug),
    enabled: !!slug,
  });
}

