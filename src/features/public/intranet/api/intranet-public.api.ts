import { handleResponse } from "@/src/lib/handle-response";
import type { IntranetLink } from "@/src/types/intranet/intranet-types";

export async function getPublicIntranetLinks(): Promise<IntranetLink[]> {
  const res = await fetch("/api/public/intranet");
  return handleResponse<IntranetLink[]>(res);
}
