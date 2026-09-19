'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { AuditLog, AuditStats } from "@/src/types/audit/audit-types";

export async function getAuditLogs(): Promise<AuditLog[]> {
  const res = await serverApiClient<ApiResponse<AuditLog[]>>("/audit");

  return res.data;
}

export async function getAuditStats(): Promise<AuditStats> {
  const res = await serverApiClient<ApiResponse<AuditStats>>("/audit/stats");

  return res.data;
}
