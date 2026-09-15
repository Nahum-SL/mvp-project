import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url"; 
import type { DashboardStats } from "@/src/types/admin/dashboard-stats";

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${getBaseUrl()}/api/admin/dashboard/stats`);
  return handleResponse<DashboardStats>(res);
}