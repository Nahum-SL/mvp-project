import { useQuery } from "@tanstack/react-query";
import { getPublicIntranetLinks } from "../api/intranet-public.query";
import { INTRANET_PUBLIC_QUERY_KEY } from "../utils/intranet-public-query-key";

// ======================
// Obtener todos los links públicos
// ======================

export const usePublicIntranetLinks = () => {
  return useQuery({
    queryKey: INTRANET_PUBLIC_QUERY_KEY.links(),
    queryFn: getPublicIntranetLinks,
  });
}