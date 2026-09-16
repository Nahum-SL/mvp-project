import { apiClient } from "@/src/lib/api/api-client";
import { ApiResponse } from "@/src/shared";
import type { JobApplication } from "@/src/types/unete/unete-types";


export async function sendJobUnete(formData: FormData): Promise<JobApplication> {
  const res = await apiClient<ApiResponse<JobApplication>>(`/public/unete/submit`, {
    method: "POST",
    body: formData,
  });
  return res.data;
}
