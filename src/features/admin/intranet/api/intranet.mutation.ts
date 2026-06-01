import { handleResponse } from "@/src/lib/handle-response";
import type {
  IntranetLink,
  CreateIntranetLinkPayload,
  UpdateIntranetLinkPayload,
} from "@/src/types/intranet/intranet-types";

import { getBaseUrl } from "@/src/lib/get-base-url";

interface UpdateParamas {
  id: number;
  payload: UpdateIntranetLinkPayload;
}

// CREATE
export async function createIntranetLinkAction(
  payload: CreateIntranetLinkPayload,
): Promise<IntranetLink> {
  const res = await fetch(`${getBaseUrl()}/api/admin/intranet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<IntranetLink>(res);
}

// UPDATE
export async function updateIntranetLinkAction({
  id,
  payload,
}: UpdateParamas): Promise<IntranetLink> {
  const res = await fetch(`${getBaseUrl()}/api/admin/intranet/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<IntranetLink>(res);
}

// DELETE
export async function deleteIntranetLinkAction(id: string): Promise<void> {
  const res = await fetch(`${getBaseUrl()}/api/admin/intranet/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(res);
}
