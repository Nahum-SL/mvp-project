'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { CleanupResponse } from "@/src/types/audit/audit-types";

// Ejecutar limpieza manual
export async function runManualCleanup(): Promise<CleanupResponse> {
  const res = await serverApiClient<ApiResponse<CleanupResponse>>("/audit/cleanup", {
    method: "POST",
  });
  return res.data
}