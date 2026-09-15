import { handleResponse } from "@/src/lib/handle-response";
import type { JobApplication } from "@/src/types/unete/unete-types";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function getJobApplications(): Promise<JobApplication[]> {
  const res = await fetch(`${getBaseUrl()}/api/admin/unete`);
  return handleResponse<JobApplication[]>(res);
}

export async function getJobApplicationById(id: string): Promise<JobApplication> {
  const res = await fetch(`${getBaseUrl()}/api/admin/unete/${id}`);
    return handleResponse<JobApplication>(res);
}