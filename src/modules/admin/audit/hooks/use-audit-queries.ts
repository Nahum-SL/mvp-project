import { useQuery } from "@tanstack/react-query";
import { getAuditLogs, getAuditStats } from "../api/audit.query";
import { AUDIT_QUERY_KEYS } from "../utils/audit-query-key";

// GET - Logs
export function useAuditLogs() {
    return useQuery({
        queryKey: AUDIT_QUERY_KEYS.logs(),
        queryFn: getAuditLogs,
        staleTime: 1000 * 60,
    });
}

// GET - Stats
export function useAuditStats() {
    return useQuery({
        queryKey: AUDIT_QUERY_KEYS.stats(),
        queryFn: getAuditStats,
        staleTime: 1000 * 60,
    });
}