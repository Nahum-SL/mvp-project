import type { CleanupResponse } from "@/src/types/audit/audit-types";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

// Ejecutar limpieza manual
export async function runManualCleanup(): Promise<CleanupResponse> {
  const res = await fetch(`${getBaseUrl()}/api/admin/audit/cleanup`, {
    method: "POST",
  });
  return handleResponse<CleanupResponse>(res);
}