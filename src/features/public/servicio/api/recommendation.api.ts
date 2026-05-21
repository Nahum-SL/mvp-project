import type {
    CompareResponses,
    CompareServicesPayload,
} from "@/src/types/servicio/recommendation";
import { handleResponse } from "@/src/lib/handle-response";

export async function compareServices(
  payload: CompareServicesPayload,
): Promise<CompareResponses> {
  const res = await fetch(`/api/public/servicio/recommendation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<CompareResponses>(res);
}
