import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/stats.query";
import { DASHBOARD_STATS_QUERY_KEYS } from "../utils/stats-query-key";

// GET - Dashboard Stats
export function useDashboardStats() {
  return useQuery({
    queryKey: DASHBOARD_STATS_QUERY_KEYS.stats(),
    queryFn: getDashboardStats,
    placeholderData: (previous) => previous,
  });
}
