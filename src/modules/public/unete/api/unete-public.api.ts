import type { JobApplication } from "@/src/types/unete/unete-types";
import { getBaseUrl } from "@/src/lib/get-base-url";
import { handleResponse } from "@/src/lib/handle-response";

export async function sendJobUnete(formData: FormData): Promise<JobApplication> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/public/unete/submit`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<JobApplication>(res);
}
