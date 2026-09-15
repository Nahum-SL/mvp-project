import { handleResponse } from "@/src/lib/handle-response";
import type { IntranetLink } from "@/src/types/intranet/intranet-types";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function getIntranetLinks(): Promise<IntranetLink[]> {
  const res = await fetch(`${getBaseUrl()}/api/admin/intranet`);
  return handleResponse<IntranetLink[]>(res);
}

export async function getIntranetLinkById(id: number): Promise<IntranetLink> {
  const res = await fetch(`${getBaseUrl()}/api/admin/intranet/${id}`);
  return handleResponse<IntranetLink>(res);
}
