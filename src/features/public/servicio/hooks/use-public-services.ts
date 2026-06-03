import { useQuery } from "@tanstack/react-query";
import {
  getPublicServiceBySlug,
  getPublicServices,
} from "../api/servicio-public.query";
import { PUBLIC_SERVICIO_QUERY_KEYS } from "../utils/public-servicios-query-key";

export function usePublicServices() {
  return useQuery({
    queryKey: PUBLIC_SERVICIO_QUERY_KEYS.all,
    queryFn: getPublicServices,
  });
}

export function usePublicServicesBySlug(slug: string) {
  return useQuery({
    queryKey: PUBLIC_SERVICIO_QUERY_KEYS.detail(slug),
    queryFn: () => getPublicServiceBySlug(slug),
    enabled: !!slug,
  });
}

