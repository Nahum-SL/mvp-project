import type { IntranetLinks } from "@/src/types/intranet/intranet-types";
import { apiClient } from "@/src/lib/api/api-client";
import { ApiResponse } from "@/src/shared";

// el fetch ocurre dentro de un page.tsx o Server Component para SEO:
export async function getPublicIntranetLinks(): Promise<IntranetLinks[]> {
  const res = await apiClient<ApiResponse<IntranetLinks[]>>(`/intranet/public`);
  return res.data;
}
