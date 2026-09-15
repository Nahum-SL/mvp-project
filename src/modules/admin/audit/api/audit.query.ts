import type { AuditLog, AuditStats } from "@/src/types/audit/audit-types";

import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function getAuditLogs(): Promise<AuditLog[]> {
  const res = await fetch(`${getBaseUrl()}/api/admin/audit`);

  return handleResponse<AuditLog[]>(res);
}

export async function getAuditStats(): Promise<AuditStats> {
  const res = await fetch(`${getBaseUrl()}/api/admin/audit/stats`);

  return handleResponse<AuditStats>(res);
}
