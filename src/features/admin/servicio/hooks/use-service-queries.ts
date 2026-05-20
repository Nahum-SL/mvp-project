import { useQuery } from "@tanstack/react-query";
import { getAdminServices } from "../api/servicio.api";
import { SERVICIO_QUERY_KEYS } from "../utils/servicio-query-options";

// GET
export function useAdminServices() {
    return useQuery({
        queryKey: [SERVICIO_QUERY_KEYS.all],
        queryFn: getAdminServices,
        staleTime: 1000 * 60 * 5
    })
}