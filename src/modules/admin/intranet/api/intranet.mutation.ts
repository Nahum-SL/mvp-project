'use server';

import type {
  IntranetLink,
} from "@/src/types/intranet/intranet-types";
import { CreateLinkInput, UpdateLinkInput } from "../schemas/intranet.schema";
import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";

interface UpdateParamas {
  id: number;
  payload: UpdateLinkInput;
}

// CREATE
export async function createIntranetLinkAction(
  payload: CreateLinkInput,
): Promise<IntranetLink> {
  const res = await serverApiClient<ApiResponse<IntranetLink>>("/intranet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.data;
}

// UPDATE
export async function updateIntranetLinkAction({
  id,
  payload,
}: UpdateParamas): Promise<IntranetLink> {
  const res = await serverApiClient<ApiResponse<IntranetLink>>(`/intranet/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.data;
}

// DELETE
export async function deleteIntranetLinkAction(id: string): Promise<void> {
  const res = await serverApiClient<ApiResponse<void>>(`/intranet/${id}`, {
    method: "DELETE",
  });
  return res.data;
}
