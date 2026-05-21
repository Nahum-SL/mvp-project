import { useQuery } from "@tanstack/react-query";
import { getContactoById, getContactosAction } from "../api/contacto.api";
import { CONTACT_QUERY_KEYS } from "../utils/contact-query-key";

// GET
export function useAdminContacts() {
  return useQuery({
    queryKey: CONTACT_QUERY_KEYS.lists(),
    queryFn: getContactosAction,
    staleTime: 1000 * 60 * 5,
  });
}

export function useContactById(id: string) {
  return useQuery({
    queryKey: CONTACT_QUERY_KEYS.detail(id),
    queryFn: () => getContactoById(id),
    enabled: !!id,
  });
}
