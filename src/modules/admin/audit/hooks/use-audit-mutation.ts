import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AUDIT_QUERY_KEYS } from "../utils/audit-query-key";

import { runManualCleanup } from "../api/audit.mutation";

export function useCleanupAudit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: runManualCleanup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUDIT_QUERY_KEYS.logs() });
      queryClient.invalidateQueries({ queryKey: AUDIT_QUERY_KEYS.stats() });
    },
  });
}
