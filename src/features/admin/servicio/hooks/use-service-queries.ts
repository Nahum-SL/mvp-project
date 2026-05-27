import { useQuery } from "@tanstack/react-query";
import { getAdminServices, getAdminServiceById } from "../api/servicio.query";
import { SERVICIO_QUERY_KEYS } from "../utils/servicio-query-key";

// GET
export function useAdminServices() {
    return useQuery({
        queryKey: SERVICIO_QUERY_KEYS.lists(),
        queryFn: getAdminServices,
        staleTime: 1000 * 60 * 5
    })
}

export function useAdminServiceById(id: number | null) {
    return useQuery({
        queryKey: SERVICIO_QUERY_KEYS.detail(id ?? 0),
        queryFn: () => getAdminServiceById(id!),
        enabled: id !== null && id > 0, // Solo ejecutar si id es válido
        staleTime: 1000 * 60 * 5
    })
}