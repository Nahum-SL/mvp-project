// src/app/(admin)/admin/page.tsx
import { DashboardStatsView } from "@/src/features/admin/dashboard/stats/views/dashboard-stats-view";

export default async function AdminDashboardPage() {
  return (
    <div className="space-y-10 pb-10">
      <DashboardStatsView />
    </div>
  );
}
