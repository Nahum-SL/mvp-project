import { useQuery } from "@tanstack/react-query";
import { getJobApplications, getJobApplicationById } from "../api/unete.query";
import { UNETE_QUERY_KEYS } from "../utils/unete-query-key";

// ==============================
// Obtener todos los candidatos
// ===============================

export const useAdminJobApplications = () => {
  return useQuery({
    queryKey: UNETE_QUERY_KEYS.lists(),
    queryFn: getJobApplications,
  });
}

// ==============================
// Obtener un candidato por ID
// ==============================

export const useAdminJobApplication = (id: string) => {
  return useQuery({
    queryKey: UNETE_QUERY_KEYS.detail(id),
    queryFn: () => getJobApplicationById(String(id)),
    enabled: !!id,
  });
}