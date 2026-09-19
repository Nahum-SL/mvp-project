'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { DashboardStats } from "@/src/types/admin/dashboard-stats";

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await serverApiClient<ApiResponse<DashboardStats>>("/admin/stats");
  return res.data;
}