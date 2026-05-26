// src/features/admin/intranet/hooks/use-intranet-queries.ts

import { useQuery } from "@tanstack/react-query";
import { getIntranetLinks, getIntranetLinkById } from "../api/intranet.query";
import { INTRANET_QUERY_KEYS } from "../utils/intranet-query-key";

// ======================
// Obtener todos los links
// ======================

export const useAdminIntranetLinks = () => {
  return useQuery({
    queryKey: INTRANET_QUERY_KEYS.lists(),

    queryFn: getIntranetLinks,
  });
};

// ======================
// Obtener un link por ID
// ======================

export const useAdminIntranetLink = (id: number | null) => {
  return useQuery({
    queryKey: INTRANET_QUERY_KEYS.detail(id ?? 0),

    queryFn: () => getIntranetLinkById(String(id)),

    enabled: id !== null && id > 0,
  });
};
