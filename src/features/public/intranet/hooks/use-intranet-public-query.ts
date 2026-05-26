import { useQuery } from "@tanstack/react-query";
import { getPublicIntranetLinks } from "../api/intranet-public.api";

// ======================
// Obtener todos los links públicos
// ======================

export const usePublicIntranetLinks = () => {
  return useQuery({
    queryKey: ["public-intranet-links"],
    queryFn: getPublicIntranetLinks,
  });
}