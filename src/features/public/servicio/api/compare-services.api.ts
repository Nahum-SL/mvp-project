import type {
    CompareResponses,
    CompareServicesPayload,
} from "@/src/types/servicio/recommendation";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function compareServices(
  payload: CompareServicesPayload,
): Promise<CompareResponses> {
  const res = await fetch(`${getBaseUrl()}/api/public/servicio/recommendation/compare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<CompareResponses>(res);
}
