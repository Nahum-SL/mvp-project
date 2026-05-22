import { handleResponse } from "@/src/lib/handle-response";
import type { IntranetLink } from "@/src/types/intranet/intranet-types";

export async function getIntranetLinks(): Promise<IntranetLink[]> {
  const res = await fetch("/api/admin/intranet");
  return handleResponse<IntranetLink[]>(res);
}

export async function getIntranetLinkById(id: string): Promise<IntranetLink> {
  const res = await fetch(`/api/admin/intranet/${id}`);
  return handleResponse<IntranetLink>(res);
}
